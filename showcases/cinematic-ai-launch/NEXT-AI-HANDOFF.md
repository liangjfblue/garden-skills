# Cinematic AI Launch Handoff

> For the next AI agent: this document is the continuation map for the `cinematic-web-video-showcase` branch. Read this first, then open the linked artifacts only when you need details.

## Current Branch

- Repo: `E:\me\project\garden-skills`
- Worktree: `E:\me\project\garden-skills\.worktrees\cinematic-web-video-showcase`
- Branch: `cinematic-web-video-showcase`
- Remote branch: `origin/cinematic-web-video-showcase`
- Do not merge to `main` unless the user explicitly asks.

## Why This Work Exists

The user is exploring whether `web-video-presentation` can become useful for content creation and monetization, not just developer workflow automation.

Earlier conclusion:

- Generic skill-check tooling is not the main opportunity.
- The useful direction is article/script-to-video content production.
- Current `web-video-presentation` has a good stage model, but weak outputs can still feel like "PPT plus animation".
- The missing layer is direction: motion treatment, stronger visual subjects, continuity between steps, sound cues, and stricter anti-PPT criteria.

The chosen strategy is:

```text
Build one strong commercial-quality showcase first.
Then extract the repeatable method back into the skill.
```

## What Has Been Built

Standalone showcase:

```text
showcases/cinematic-ai-launch/
├── article.md
├── script.md
├── outline.md
├── motion-treatment.md
├── sound-plan.md
├── README.md
├── NEXT-AI-HANDOFF.md
└── presentation/
```

The showcase concept is:

```text
Article In. Video Out.
把文章变成一条能发布的视频
```

It presents `web-video-presentation` itself as a product-launch style video. The story chain is:

```text
article.md -> script.md -> motion-treatment.md -> presentation -> video.mp4
```

The current implementation has one eight-step chapter:

1. Article lands on a dark stage.
2. Old workflow splits into disconnected islands.
3. Article enters a unified pipeline.
4. Script turns into beat blocks.
5. Beats turn into motion treatments.
6. Sound cues lock to the frame.
7. Auto mode becomes one-take recording.
8. Final artifact chain locks into `video.mp4`.

## Important Files

Planning and rationale:

- `docs/superpowers/specs/2026-05-13-cinematic-web-video-showcase-design.md`
- `docs/superpowers/plans/2026-05-13-cinematic-web-video-showcase.md`
- `showcases/cinematic-ai-launch/README.md`

Showcase content:

- `showcases/cinematic-ai-launch/article.md`
- `showcases/cinematic-ai-launch/script.md`
- `showcases/cinematic-ai-launch/outline.md`
- `showcases/cinematic-ai-launch/motion-treatment.md`
- `showcases/cinematic-ai-launch/sound-plan.md`

Implementation:

- `showcases/cinematic-ai-launch/presentation/src/chapters/01-cinematic-ai-launch/CinematicAiLaunch.tsx`
- `showcases/cinematic-ai-launch/presentation/src/chapters/01-cinematic-ai-launch/CinematicAiLaunch.css`
- `showcases/cinematic-ai-launch/presentation/src/chapters/01-cinematic-ai-launch/narrations.ts`
- `showcases/cinematic-ai-launch/presentation/src/registry/chapters.ts`
- `showcases/cinematic-ai-launch/presentation/scripts/make-sfx.mjs`
- `showcases/cinematic-ai-launch/presentation/public/sfx/*.wav`

## What Was Recently Improved

The user asked for:

- stronger continuity between steps
- stronger visual subjects
- lower sound-effect volume

Implemented changes:

- Added a cross-step continuity spine.
- Added a moving signal packet that carries the viewer's eye across the chapter.
- Added a stronger motion core in step 5.
- Added a sync sweep in step 6.
- Added a scanline in step 7.
- Lowered local sound cue playback volume.
- Added background and follow-up direction to `README.md`.

## Current Verification Status

These commands have passed previously inside:

```text
showcases/cinematic-ai-launch/presentation
```

Commands:

```bash
npx tsc --noEmit
npm run build
npm run test:images
npm run extract-narrations
```

Browser-level visual verification was not completed in Codex because the in-app browser tool was unavailable, and local Playwright browser binaries were not installed. Do not claim that screenshot/browser verification has passed unless you run it fresh.

## How To Run

```bash
cd showcases/cinematic-ai-launch/presentation
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

If Vite chooses a different port, use the printed local URL.

## Recommended Next Step

Do not immediately generalize into a large motion framework. The next useful step is to extract the proven method into the `web-video-presentation` skill documentation.

Create or update these files:

```text
skills/web-video-presentation/references/MOTION-TREATMENT.md
skills/web-video-presentation/references/SOUND-DESIGN.md
skills/web-video-presentation/references/CHAPTER-CRAFT.md
skills/web-video-presentation/SKILL.md
```

The goal is to make future generated presentations consistently less like PPT.

## Phase 2 Plan: Fold Lessons Back Into The Skill

### 1. Add `MOTION-TREATMENT.md`

Purpose: require a small direction pass before coding any chapter.

It should define a table like this:

```markdown
| Step | Narrative Beat | Dominant Action | Transition In | Transition Out | Persistent Object | Extra Visual Information | Anti-PPT Risk |
|---|---|---|---|---|---|---|---|
```

Rules to capture:

- Every step needs one dominant action.
- Text is labeling, not the whole scene.
- At least one visual object should persist across adjacent steps.
- Each transition should be motivated by the story.
- If a step can be described as "title plus cards", redesign it.

Use `showcases/cinematic-ai-launch/motion-treatment.md` as the first concrete example.

### 2. Add `SOUND-DESIGN.md`

Purpose: make sound cues optional but intentional.

Keep it lightweight. Do not build a full audio engine yet.

Rules to capture:

- Sound cues should make step changes feel like edit points.
- Effects must not compete with narration.
- Start with subtle cue volume around `0.10` to `0.16`.
- Cue plans should name the intended feeling, not just the file name.
- Background music, ducking, multitrack mixing, and exact sync are later-stage work.

Use `showcases/cinematic-ai-launch/sound-plan.md` as the first concrete example, but update the volume guidance because the initial `0.24` was too loud.

### 3. Update `CHAPTER-CRAFT.md`

Add a stronger anti-PPT checklist:

- Does the first screen have a visual event, not only a title?
- Does every step perform a change?
- Can the viewer follow an object, line, packet, frame, or shape across transitions?
- Are repeated cards/grids avoided unless they actively transform?
- Does motion reveal meaning, or is it only decoration?
- Would this still work if screen-recorded without cursor interaction?

Add a pre-coding gate:

```text
Before implementing a chapter, write or derive a motion treatment.
Do not start TSX/CSS until each step has a dominant action and transition out.
```

### 4. Update `SKILL.md`

Add a new Phase 2 step between outline approval and chapter coding:

```text
Phase 2.1 Direction pass
  Create motion-treatment.md for the selected chapter or full piece.
  If sound is requested, create sound-plan.md.
  Stop if the treatment still reads like PPT.
```

Then shift existing scaffold/chapter steps down as needed.

Also update the file layout to mention:

```text
motion-treatment.md
sound-plan.md
```

### 5. Optional: Add Templates

After the docs are updated, consider adding:

```text
skills/web-video-presentation/templates/motion-treatment.md
skills/web-video-presentation/templates/sound-plan.md
```

Only add templates if the skill will actually copy them during workflow. Otherwise docs are enough.

## Further Showcase Polish Ideas

If the user wants more visual polish before skill extraction, prioritize these:

1. Step 2 to step 3 continuity: make tangled lines visibly reorganize into the pipeline spine.
2. Step 5 visual subject: replace small cards with one larger integrated "motion lab" object.
3. Step 6 sound lane: make the sweep visibly lock cue markers to beat positions.
4. Step 8 final lockup: make `video.mp4` feel like a real output object, not just final text.
5. Add a short `?auto=1` timing review and adjust per-step durations if cuts feel rushed.

Avoid these unless the user asks:

- Full timeline engine.
- GSAP/Three.js/Remotion migration.
- Large reusable component library.
- Background music system.
- Merging this branch to `main`.

## Known Environment Notes

- `.gitattributes` was added so shell scripts use LF line endings.
- Windows PowerShell is the working shell.
- Earlier Bash scaffold had trouble finding `node`, so PowerShell was used for setup.
- The showcase app uses Vite + React + TypeScript.
- Some generated Vite starter files were cleaned up after scaffolding.

## Suggested First Prompt For The Next AI

```text
Read showcases/cinematic-ai-launch/NEXT-AI-HANDOFF.md.
Then implement Phase 2: fold the showcase lessons into the web-video-presentation skill docs.
Do not merge to main. Commit and push on the current feature branch.
```

