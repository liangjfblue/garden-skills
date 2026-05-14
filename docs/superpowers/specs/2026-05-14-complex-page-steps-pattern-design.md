# Complex Page Steps Pattern Design

## Purpose

Add a reusable `web-video-presentation` pattern for explaining one complex page across multiple narration steps. The goal is to support product UI walkthroughs, system diagrams, dashboards, workflows, business maps, and code/toolchain explanations without forcing every step to become a full-screen scene change.

This work references the `cinematic-focus-zoom-showcase` experiment, but does not merge its showcase implementation. The useful part is the pattern: persistent spatial context plus moving focus.

## Problem

The current skill strongly implies:

```text
one narration step = one full-screen scene
```

That works for hooks, chapter breaks, list reveals, and cinematic cuts. It is weaker for complex subjects where the viewer needs spatial memory:

- a product screen with several regions
- a dashboard with inputs, metrics, and outputs
- a system architecture diagram
- a business model map
- a code or toolchain pipeline

If each narration beat switches to a new full-screen layout, the viewer has to rebuild context every time. If all regions appear at once, the result feels like a dense PPT slide.

## Design Principle

Introduce a second valid page organization mode:

```text
one persistent page + multiple step-level focus changes
```

The page stays spatially stable. Each step changes:

- active region
- local highlight
- connecting line
- status state
- scan/focus indicator
- completed/pending visual treatment

The narration step remains the source of truth. This pattern changes the visual organization, not the step model.

## Non-Goals

- Do not merge the large `CinematicAiLaunch.tsx` / CSS implementation from `cinematic-focus-zoom-showcase`.
- Do not add a generic animation library.
- Do not create a hard default template that makes every output look like the focus/zoom experiment.
- Do not require a center focus card in every implementation.
- Do not change `narrations.ts`, audio extraction, or auto-recording semantics.

## Skill Changes

### `SKILL.md`

Update the description and ten principles so they no longer say every step must occupy a full new screen. The new rule is:

```text
one step = one focused idea
```

That focused idea may be implemented as:

- a full-screen scene/cut
- a region-level focus change inside one complex page

### `references/CHAPTER-CRAFT.md`

Add a section called "两种页面组织方式":

| Mode | Use When | Behavior |
|---|---|---|
| Full-screen scene | hook, strong turn, chapter beat, concept impact | step controls the whole composition |
| Complex page steps | UI, dashboard, diagram, workflow, system, map | page persists; step changes focus/state |

Add rules:

- Keep the main page object visible for multiple adjacent steps.
- Only one region should be active per step.
- Completed regions become lower-emphasis but recognizable.
- Pending regions stay visible but quiet.
- Use a focus frame, signal line, packet, scanline, magnifier, path, or state change to move attention.
- Do not rely on a mouse cursor to explain the focus.

### `references/COMPLEX-PAGE-STEPS.md`

Create a dedicated reference with:

- when to use the pattern
- when not to use it
- motion-treatment fields that matter most
- a small state helper pattern
- minimal CSS state example
- anti-patterns
- relation to audio and auto-recording

### `references/MOTION-TREATMENT.md`

If this file exists in the current branch, update it. If not, create it as part of the broader motion-treatment upgrade. It should explicitly mention that a `Persistent Object` can be the entire page surface.

### `references/EXAMPLES/complex-page-steps/`

Add a small, non-cinematic example. It should show structure, not art direction.

Files:

```text
README.md
chapter.tsx
chapter.css
```

The example should demonstrate four steps:

1. overall product surface appears
2. input/source region becomes active
3. processing/path region becomes active
4. output/result region becomes active

It should include a tiny helper:

```ts
function zoneState(step: number, zoneStep: number) {
  if (step === zoneStep) return "active";
  if (step > zoneStep) return "complete";
  return "pending";
}
```

CSS should stay minimal. It should not copy the focus/zoom showcase's large absolute-positioned visual system.

## Merge Policy

Merge from `cinematic-focus-zoom-showcase` conceptually, not mechanically.

Allowed to borrow:

- `active / complete / pending` region states
- persistent page/workbench idea
- signal/focus object concept
- step-level zone focus wording

Do not borrow:

- the showcase's full TSX/CSS
- exact class names
- exact absolute coordinates
- center-card animation as a required pattern
- the specific `Article In. Video Out.` showcase implementation

## Success Criteria

- A future AI can decide when to use complex-page steps instead of full-screen scenes.
- The docs make `step != full-screen cut` clear without weakening the video-first rules.
- The example is small enough to read quickly and copy structurally.
- The pattern helps avoid both dense PPT slides and disorienting full-screen cuts.
- No experimental showcase code is merged into the skill template.

