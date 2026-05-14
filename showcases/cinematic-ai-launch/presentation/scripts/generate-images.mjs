#!/usr/bin/env node
/**
 * generate-images.mjs — generate chapter image assets with APIMart GPT Image 2.
 *
 * Reads `image-prompts.md`, submits selected prompts to
 * https://api.apimart.ai/v1/images/generations, polls task status, downloads
 * the generated image, and records output in `image-manifest.json`.
 *
 * Required:
 *   APIMART_API_KEY=sk-...
 *
 * Usage:
 *   npm run generate-images
 *   npm run generate-images -- --id=01-hook-cover
 *   npm run generate-images -- --force
 *   npm run generate-images -- --dry-run
 */
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

function readConfig(env = process.env) {
  return {
    endpoint:
      env.APIMART_IMAGE_ENDPOINT ??
      "https://api.apimart.ai/v1/images/generations",
    taskEndpoint: env.APIMART_TASK_ENDPOINT ?? "https://api.apimart.ai/v1/tasks",
    model: env.IMAGE_MODEL ?? "gpt-image-2",
    size: env.IMAGE_SIZE ?? "16:9",
    resolution: env.IMAGE_RESOLUTION ?? "2k",
    n: Number(env.IMAGE_N ?? "1"),
    promptFile: env.IMAGE_PROMPTS_FILE ?? "image-prompts.md",
    manifestFile: env.IMAGE_MANIFEST_FILE ?? "image-manifest.json",
    pollIntervalMs: Number(env.IMAGE_POLL_INTERVAL_MS ?? "5000"),
    pollTimeoutMs: Number(env.IMAGE_POLL_TIMEOUT_MS ?? "600000"),
  };
}

export async function loadEnvFile(envPath, env = process.env) {
  let content;
  try {
    content = await readFile(envPath, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalsIndex = line.indexOf("=");
    if (equalsIndex <= 0) continue;

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in env)) env[key] = value;
  }
}

export function parseImagePrompts(markdown) {
  const sections = [];
  const regex = /^##\s+([A-Za-z0-9][A-Za-z0-9_.-]*)\s*$/gm;
  const matches = [...markdown.matchAll(regex)];

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const id = current[1];
    const start = current.index + current[0].length;
    const end = next ? next.index : markdown.length;
    const prompt = markdown
      .slice(start, end)
      .replace(/^\s*---\s*$/gm, "")
      .trim();
    if (prompt) sections.push({ id, prompt });
  }

  return sections;
}

export function buildGenerationPayload(prompt, options = {}) {
  const config = readConfig();
  return {
    model: options.model ?? config.model,
    prompt,
    n: options.n ?? config.n,
    size: options.size ?? config.size,
    resolution: options.resolution ?? config.resolution,
  };
}

export function parseTaskId(responseJson) {
  const data = responseJson?.data;
  const taskId = Array.isArray(data) ? data[0]?.task_id : data?.task_id;
  if (!taskId) {
    throw new Error(`APIMart response did not include task_id: ${jsonPreview(responseJson)}`);
  }
  return taskId;
}

export function parseTaskImageUrl(responseJson) {
  const status = responseJson?.data?.status ?? responseJson?.status;
  if (status && !["completed", "succeeded", "success"].includes(status)) {
    if (["failed", "error", "cancelled"].includes(status)) {
      throw new Error(`image task failed: ${jsonPreview(responseJson)}`);
    }
    return null;
  }

  const images = responseJson?.data?.result?.images ?? responseJson?.result?.images;
  const first = images?.[0];
  const url = Array.isArray(first?.url) ? first.url[0] : first?.url;
  return typeof url === "string" && url.length > 0 ? url : null;
}

export async function updateManifest(manifestPath, record) {
  let manifest = { assets: [] };
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  if (!Array.isArray(manifest.assets)) manifest.assets = [];

  const index = manifest.assets.findIndex((asset) => asset.id === record.id);
  if (index >= 0) {
    manifest.assets[index] = { ...manifest.assets[index], ...record };
  } else {
    manifest.assets.push(record);
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

function parseArgs(argv) {
  const args = {
    ids: [],
    force: false,
    dryRun: false,
  };

  for (const arg of argv) {
    if (arg === "--force") args.force = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg.startsWith("--id=")) args.ids.push(arg.slice("--id=".length));
    else throw new Error(`unknown arg: ${arg}`);
  }

  return args;
}

async function readManifest(manifestPath) {
  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    return Array.isArray(manifest.assets) ? manifest.assets : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function submitGeneration(prompt, apiKey) {
  const config = readConfig();
  const payload = buildGenerationPayload(prompt);
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`APIMart generation request failed ${response.status}: ${jsonPreview(json)}`);
  }

  return parseTaskId(json);
}

async function pollImageUrl(taskId, apiKey) {
  const config = readConfig();
  const startedAt = Date.now();
  const taskUrl = `${config.taskEndpoint}/${encodeURIComponent(taskId)}`;

  while (Date.now() - startedAt < config.pollTimeoutMs) {
    const response = await fetch(taskUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const json = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(`APIMart task request failed ${response.status}: ${jsonPreview(json)}`);
    }

    const imageUrl = parseTaskImageUrl(json);
    if (imageUrl) return imageUrl;
    await sleep(config.pollIntervalMs);
  }

  throw new Error(`timed out waiting for image task ${taskId}`);
}

async function downloadFile(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`download failed ${response.status}: ${url}`);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await pipeline(response.body, createWriteStream(outputPath));
}

function inferChapter(id) {
  const match = id.match(/^(\d{2}-[^-]+(?:-[^-]+)?)/);
  return match?.[1] ?? id.split("-").slice(0, 2).join("-");
}

function inferRole(id) {
  if (id.includes("cover")) return "cover";
  if (id.includes("background")) return "background";
  if (id.includes("infographic")) return "infographic";
  return "chapter-image";
}

function outputPathFor(id) {
  const chapter = inferChapter(id);
  const role = inferRole(id);
  if (role === "cover") return `assets/cover/${id}.png`;
  return `assets/chapters/${chapter}/${id}.png`;
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function jsonPreview(value) {
  return JSON.stringify(value).slice(0, 1000);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await loadEnvFile(resolve(ROOT, ".env"));
  const config = readConfig();

  const promptPath = resolve(ROOT, config.promptFile);
  const manifestPath = resolve(ROOT, config.manifestFile);
  const apiKey = process.env.APIMART_API_KEY;

  const prompts = parseImagePrompts(await readFile(promptPath, "utf8"));
  const selected = args.ids.length
    ? prompts.filter((entry) => args.ids.includes(entry.id))
    : prompts;

  const missing = args.ids.filter((id) => !prompts.some((entry) => entry.id === id));
  if (missing.length > 0) {
    throw new Error(`prompt id not found in ${config.promptFile}: ${missing.join(", ")}`);
  }

  const existing = await readManifest(manifestPath);
  let generated = 0;
  let skipped = 0;

  for (const entry of selected) {
    const relativePath = outputPathFor(entry.id);
    const existingAsset = existing.find((asset) => asset.id === entry.id);
    if (existingAsset?.status === "approved" && !args.force) {
      skipped++;
      console.log(`[skip] ${entry.id} already approved`);
      continue;
    }

    if (args.dryRun) {
      console.log(`[dry-run] ${entry.id}`);
      console.log(JSON.stringify(buildGenerationPayload(entry.prompt), null, 2));
      continue;
    }

    if (!apiKey) {
      throw new Error("APIMART_API_KEY is required. Example: APIMART_API_KEY=sk-... npm run generate-images");
    }

    console.log(`[submit] ${entry.id}`);
    const taskId = await submitGeneration(entry.prompt, apiKey);
    console.log(`[poll] ${entry.id} task=${taskId}`);
    const sourceUrl = await pollImageUrl(taskId, apiKey);
    await downloadFile(sourceUrl, resolve(ROOT, relativePath));
    await updateManifest(manifestPath, {
      id: entry.id,
      chapter: inferChapter(entry.id),
      role: inferRole(entry.id),
      path: relativePath.replaceAll("\\", "/"),
      promptFile: DEFAULTS.promptFile,
      model: config.model,
      size: config.size,
      resolution: config.resolution,
      status: "generated",
      taskId,
      sourceUrl,
    });
    generated++;
    console.log(`[ok] ${entry.id} -> ${relativePath}`);
  }

  console.log(`images: generated ${generated}, skipped ${skipped}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`✗ ${err.message ?? err}`);
    process.exit(1);
  });
}
