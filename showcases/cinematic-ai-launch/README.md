# Cinematic AI Launch Showcase

This showcase proves the target quality bar for `web-video-presentation`: a recordable web stage that feels closer to a product launch video than a slide deck.

## Run

```bash
cd presentation
npm install
npm run dev
```

Manual mode:

```text
http://localhost:5173/
```

Audio preview mode:

```text
http://localhost:5173/?audio=1
```

Auto recording mode:

```text
http://localhost:5173/?auto=1
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

## Follow-Up

After this showcase is accepted, fold the lessons back into the skill:

- Add `references/MOTION-TREATMENT.md`.
- Add `references/SOUND-DESIGN.md`.
- Update `references/CHAPTER-CRAFT.md` with a stronger anti-PPT checklist.
