import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";
import {
  buildGenerationPayload,
  loadEnvFile,
  parseImagePrompts,
  parseTaskId,
  parseTaskImageUrl,
  updateManifest,
} from "./generate-images.mjs";

test("parseImagePrompts reads asset sections from markdown", () => {
  const prompts = parseImagePrompts(`# Image Prompts

## 01-hook-cover

用途：视频开场主视觉

场景：
一个 AI 工具爆火的商业分析画面。

构图：
16:9 横屏，右侧留标题区。

---

## 02-case-map

用途：章节插图

场景：
一个案例拆解的信息图。
`);

  assert.equal(prompts.length, 2);
  assert.equal(prompts[0].id, "01-hook-cover");
  assert.match(prompts[0].prompt, /AI 工具爆火/);
  assert.equal(prompts[1].id, "02-case-map");
});

test("buildGenerationPayload uses APIMart GPT Image 2 defaults", () => {
  assert.deepEqual(buildGenerationPayload("一只橘猫", {}), {
    model: "gpt-image-2",
    prompt: "一只橘猫",
    n: 1,
    size: "16:9",
    resolution: "2k",
  });
});

test("loadEnvFile reads local dotenv values without overriding existing env", async () => {
  const root = join(process.cwd(), ".tmp-generate-images-env-test");
  await rm(root, { recursive: true, force: true });
  await mkdir(root, { recursive: true });
  await writeFile(
    join(root, ".env"),
    [
      "APIMART_API_KEY=from_env_file",
      "IMAGE_RESOLUTION=\"4k\"",
      "EXISTING_VALUE=from_env_file",
      "# comment",
      "",
    ].join("\n"),
    "utf8",
  );

  const env = { EXISTING_VALUE: "from_process" };
  await loadEnvFile(join(root, ".env"), env);

  assert.equal(env.APIMART_API_KEY, "from_env_file");
  assert.equal(env.IMAGE_RESOLUTION, "4k");
  assert.equal(env.EXISTING_VALUE, "from_process");

  await rm(root, { recursive: true, force: true });
});

test("parseTaskId reads APIMart submitted response", () => {
  const taskId = parseTaskId({
    code: 200,
    data: [{ status: "submitted", task_id: "task_123" }],
  });

  assert.equal(taskId, "task_123");
});

test("parseTaskImageUrl reads APIMart completed task response", () => {
  const imageUrl = parseTaskImageUrl({
    code: 200,
    data: {
      status: "completed",
      result: {
        images: [{ url: ["https://upload.apimart.ai/f/image/out.png"] }],
      },
    },
  });

  assert.equal(imageUrl, "https://upload.apimart.ai/f/image/out.png");
});

test("updateManifest upserts asset records", async () => {
  const root = join(process.cwd(), ".tmp-generate-images-test");
  await rm(root, { recursive: true, force: true });
  await mkdir(root, { recursive: true });

  const manifestPath = join(root, "image-manifest.json");
  await writeFile(
    manifestPath,
    JSON.stringify({ assets: [{ id: "old", status: "approved" }] }, null, 2),
    "utf8",
  );

  await updateManifest(manifestPath, {
    id: "01-hook-cover",
    chapter: "01-hook",
    role: "cover",
    path: "assets/chapters/01-hook/01-hook-cover.png",
    promptFile: "image-prompts.md",
    model: "gpt-image-2",
    status: "generated",
    taskId: "task_123",
    sourceUrl: "https://upload.apimart.ai/f/image/out.png",
  });

  const saved = JSON.parse(await readFile(manifestPath, "utf8"));
  assert.equal(saved.assets.length, 2);
  assert.equal(saved.assets[1].id, "01-hook-cover");
  assert.equal(saved.assets[1].taskId, "task_123");

  await rm(root, { recursive: true, force: true });
});
