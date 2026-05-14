# Web Video Presentation Skill

**A method-driven agent skill for turning scripts and articles into click-driven 16:9 web presentations that can be screen-recorded as cinematic videos.**

[中文文档](./README.zh-CN.md) · [Back to collection root](../../README.md)

![Web Video Presentation Skill](../../dist/imgs/web-video-presentation-skill.png)

---

## What Is This?

`web-video-presentation` helps an agent build a Vite + React + TypeScript presentation that behaves like a video production surface rather than a slide deck. Each click advances one narration beat; a step can own the whole 1920×1080 stage or focus one region inside a persistent complex page. The progress UI stays hidden unless hovered so the output is clean for screen recording.

It is designed for:

- Turning a written article into a Bilibili / YouTube / video-channel narration script
- Turning an existing voiceover script into a cinematic web presentation
- Building product demos, tutorials, keynote-style explainers, and visual talks
- Creating “dynamic PPT, but not PPT” experiences with strong motion and pacing
- Optionally synthesizing narration audio after the visual outline is approved
- Batch-generating cover images, chapter illustrations, and infographics with APIMart GPT Image 2

The skill is primarily a **methodology and collaboration workflow**. The scaffold supplies reusable tokens, stage primitives, themes, and examples, but each project should still choose a visual language that fits the topic.

---

## Core Ideas

- **Fixed 16:9 stage** — content is authored in a stable 1920×1080 coordinate system and scaled to the viewport.
- **One global step cursor** — click or keyboard advances `(chapter, step)`, with the cursor persisted locally.
- **One step, one idea** — every beat gets one focused visual action, either as a full-screen scene or a region focus inside a complex page.
- **Script beats drive structure** — narration rhythm maps directly to visual steps.
- **Hidden chrome** — progress controls are hover-only, keeping recordings clean.
- **Motion first** — each scene needs a moving visual anchor; static paragraphs are treated as a smell.
- **Theme tokens** — visual decisions flow through semantic tokens so themes can change the whole feel.
- **Hard checkpoints** — the agent pauses after script/theme alignment, after outline approval, and before optional audio synthesis.

---

## Workflow

```text
Phase 1.1  Identify input
Phase 1.2  Article -> narration script
   |
Checkpoint A1  Script, theme, and rough asset plan
   |
Phase 1.3  Script + article -> outline.md
   |
Checkpoint A2  Outline approval + development mode
   |
Phase 2    Build the Vite / React / TS presentation
   |
Checkpoint B   Ask whether to synthesize audio
   |
Phase 3    Optional audio synthesis
Phase 4    Recording and post-production
```

The checkpoints are part of the skill contract: the agent should not silently rush from raw article to finished code. Theme choice influences motion design, and outline approval keeps chapter pacing from drifting.

---

## What It Ships

```text
skills/web-video-presentation/
├── SKILL.md
├── README.md / README.zh-CN.md
├── references/
│   ├── PRINCIPLES.md
│   ├── CHAPTER-CRAFT.md
│   ├── OUTLINE-FORMAT.md
│   ├── SCRIPT-STYLE.md
│   ├── THEMES.md
│   ├── AUDIO.md
│   ├── IMAGE-GENERATION.md
│   └── RECORDING.md
├── scripts/
│   └── scaffold.sh
├── templates/
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
└── themes/
    ├── paper-press/
    ├── warm-keynote/
    ├── midnight-press/
    ├── blueprint/
    └── ...
```

---

## Quick Start

Copy the skill into the directory your agent scans, then ask it to turn a script or article into a web-video presentation.

To scaffold manually from inside a project:

```bash
bash skills/web-video-presentation/scripts/scaffold.sh ./presentation --theme=paper-press
```

List available themes:

```bash
bash skills/web-video-presentation/scripts/scaffold.sh --list-themes
```

The generated `presentation/` project is a normal Vite + React + TypeScript app. Run it like any other Vite project, then record the 16:9 stage with your screen recorder.

---

## GPT Image 2

The scaffolded project includes:

```text
asset-plan.md
image-prompts.md
image-manifest.json
scripts/generate-images.mjs
```

Recommended flow:

```bash
npm run generate-images -- --dry-run
cp .env.example .env
npm run generate-images
```

Default APIMart GPT Image 2 payload:

```json
{
  "model": "gpt-image-2",
  "n": 1,
  "size": "16:9",
  "resolution": "2k"
}
```

See [IMAGE-GENERATION.md](./references/IMAGE-GENERATION.md) for the full flow.

---

## Built-In Theme Directions

The skill includes multiple theme families, each with its own visual DNA rather than a simple color swap:

- `paper-press` — editorial paper, warm print texture
- `warm-keynote` — modern talk / keynote energy
- `midnight-press` — dark editorial presentation
- `blueprint` — technical drawing / planning surface
- `chalk-garden` — classroom / chalkboard style
- `terminal-green` — phosphor terminal atmosphere
- `bauhaus-bold` — sharp geometric manifesto
- `sunset-zine` — indie zine / expressive collage
- `newsroom` — newspaper / media desk
- `monochrome-print` — restrained typographic print

See [THEMES.md](./references/THEMES.md) for the full token contract and theme guidance.

---

## Reference Map

- [PRINCIPLES.md](./references/PRINCIPLES.md) — core rules for video-like web presentations
- [CHAPTER-CRAFT.md](./references/CHAPTER-CRAFT.md) — chapter implementation rules and visual checklist
- [OUTLINE-FORMAT.md](./references/OUTLINE-FORMAT.md) — required outline structure
- [SCRIPT-STYLE.md](./references/SCRIPT-STYLE.md) — article-to-narration rewrite guidance
- [PATTERNS.md](./references/PATTERNS.md) — optional visual primitive recipes
- [AUDIO.md](./references/AUDIO.md) — optional narration synthesis workflow
- [IMAGE-GENERATION.md](./references/IMAGE-GENERATION.md) — APIMart GPT Image 2 asset workflow
- [RECORDING.md](./references/RECORDING.md) — screen recording and post-production notes

