import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const sampleRate = 44100;
const outDir = fileURLToPath(new URL("../public/sfx/", import.meta.url));

function clamp(n) {
  return Math.max(-1, Math.min(1, n));
}

function env(t, duration, attack = 0.015, release = 0.16) {
  if (t < attack) return t / attack;
  if (t > duration - release) return Math.max(0, (duration - t) / release);
  return 1;
}

function writeWav(name, duration, render) {
  const frames = Math.floor(sampleRate * duration);
  const data = Buffer.alloc(frames * 2);

  for (let i = 0; i < frames; i += 1) {
    const t = i / sampleRate;
    const s = clamp(render(t, duration));
    data.writeInt16LE(Math.round(s * 32767), i * 2);
  }

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);

  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, name), Buffer.concat([header, data]));
}

writeWav("low-hit.wav", 0.7, (t, d) => {
  const drop = Math.sin(2 * Math.PI * (78 - t * 42) * t);
  const click = Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 34);
  return (drop * 0.52 + click * 0.25) * env(t, d, 0.004, 0.48);
});

writeWav("soft-whoosh.wav", 0.62, (t, d) => {
  const sweep = Math.sin(2 * Math.PI * (280 + t * 900) * t);
  const noise = Math.sin(2 * Math.PI * 41 * t) * Math.sin(2 * Math.PI * 113 * t);
  return (sweep * 0.16 + noise * 0.2) * env(t, d, 0.08, 0.22);
});

writeWav("tick.wav", 0.16, (t, d) => {
  const body = Math.sin(2 * Math.PI * 1300 * t) * Math.exp(-t * 55);
  return body * env(t, d, 0.002, 0.08) * 0.32;
});

writeWav("data-pop.wav", 0.24, (t, d) => {
  const a = Math.sin(2 * Math.PI * 620 * t);
  const b = Math.sin(2 * Math.PI * 930 * t) * Math.exp(-t * 22);
  return (a * 0.18 + b * 0.2) * env(t, d, 0.004, 0.12);
});

writeWav("lock.wav", 0.36, (t, d) => {
  const tone = Math.sin(2 * Math.PI * 220 * t) + Math.sin(2 * Math.PI * 440 * t) * 0.5;
  const snap = Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-t * 42);
  return (tone * 0.22 + snap * 0.18) * env(t, d, 0.006, 0.2);
});

writeWav("room-tone.wav", 1.6, (t, d) => {
  const low = Math.sin(2 * Math.PI * 38 * t) * 0.16;
  const shimmer = Math.sin(2 * Math.PI * 73 * t) * Math.sin(2 * Math.PI * 121 * t) * 0.04;
  return (low + shimmer) * env(t, d, 0.25, 0.55);
});

console.log("Generated showcase SFX in public/sfx");
