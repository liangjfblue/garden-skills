# Cinematic AI Launch Showcase

This showcase proves the target quality bar for `web-video-presentation`: a recordable web stage that feels closer to a product launch video than a slide deck.

## Background

`web-video-presentation` already has the foundation for article-to-video work:

- a fixed 16:9 web stage
- click-driven steps
- `script.md`, `outline.md`, and `narrations.ts`
- theme tokens
- hidden chrome for clean recording
- audio and auto-recording paths

In real use, the default result can still feel only slightly better than PPT. The missing layer is not the web stage itself. The missing layer is direction:

- motion treatment before coding
- a strong visual subject in each step
- continuity between steps
- sound cues that make clicks feel like edit points
- stricter anti-PPT acceptance criteria

This showcase exists to validate that direction with a concrete sample before changing the skill rules. The strategy is:

```text
make one strong commercial sample first
then extract the repeatable method back into the skill
```

## Concept

The piece presents `web-video-presentation` itself as a product launch:

```text
Article In. Video Out.
把文章变成一条能发布的视频
```

The story is simple:

```text
article.md
  -> script.md
  -> motion-treatment.md
  -> presentation
  -> video.mp4
```

The goal is not to explain every feature. The goal is to show that an article can become a video-like staged experience with motion, transitions, and sound.

## Run

```bash
cd presentation
npm install
npm run dev
```

Manual mode:

```text
http://localhost:5174/
```

Audio preview mode:

```text
http://localhost:5174/?audio=1
```

Auto recording mode:

```text
http://localhost:5174/?auto=1
```

## Structure

- `article.md` is the source article.
- `script.md` is the spoken launch script.
- `outline.md` is the eight-step screen plan.
- `motion-treatment.md` defines the action design for each step.
- `sound-plan.md` defines local step sound cues.
- `presentation/` contains the Vite + React implementation.

## What This Demonstrates

- Each step has a dominant action.
- Transitions preserve visual continuity.
- Sound cues make step changes feel like edit points.
- The base template can support a commercial-looking video sample without becoming a full video engine.

Recent polish added:

- a cross-step signal spine
- a moving signal packet that carries continuity through the chapter
- a stronger motion core in the motion-treatment step
- a sync sweep in the sound step
- a scanline in the recording step
- softer local sound cue volume

## Follow-Up

After this showcase is accepted, fold the lessons back into the skill:

- Add `references/MOTION-TREATMENT.md`.
- Add `references/SOUND-DESIGN.md`.
- Update `references/CHAPTER-CRAFT.md` with a stronger anti-PPT checklist.
