# Complex Page Steps Pattern Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable documentation pattern and small reference example for explaining one complex page across multiple narration steps.

**Architecture:** This is a skill documentation upgrade, not a template-framework change. Add one dedicated reference document, update the main skill and chapter craft rules, and add one small example under `references/EXAMPLES/complex-page-steps/`.

**Tech Stack:** Markdown documentation plus small React/TypeScript and CSS example snippets.

---

## Files

- Create: `skills/web-video-presentation/references/COMPLEX-PAGE-STEPS.md`
- Create: `skills/web-video-presentation/references/EXAMPLES/complex-page-steps/README.md`
- Create: `skills/web-video-presentation/references/EXAMPLES/complex-page-steps/chapter.tsx`
- Create: `skills/web-video-presentation/references/EXAMPLES/complex-page-steps/chapter.css`
- Modify: `skills/web-video-presentation/SKILL.md`
- Modify: `skills/web-video-presentation/references/CHAPTER-CRAFT.md`
- Modify: `skills/web-video-presentation/references/EXAMPLES/README.md`

## Tasks

### Task 1: Add Dedicated Reference

- [x] Create `COMPLEX-PAGE-STEPS.md` explaining when to use the pattern, when not to use it, the active/complete/pending state model, minimal TSX/CSS, and anti-patterns.
- [x] Ensure the document explicitly says not to copy the `cinematic-focus-zoom-showcase` implementation.

### Task 2: Update Core Skill Docs

- [x] Update `SKILL.md` description and ten principles so `one step = one focused idea`, not necessarily one full-screen scene.
- [x] Update `CHAPTER-CRAFT.md` with the two page organization modes and completion checklist items for complex page steps.
- [x] Link `COMPLEX-PAGE-STEPS.md` from relevant resource tables.

### Task 3: Add Small Example

- [x] Add `references/EXAMPLES/complex-page-steps/README.md`.
- [x] Add a four-step `chapter.tsx` with a small `zoneState()` helper.
- [x] Add minimal `chapter.css` showing active/complete/pending state styling, focus path, and one signal dot.
- [x] Update `references/EXAMPLES/README.md` to list the new example.

### Task 4: Verify And Commit

- [x] Run `git diff --check`.
- [x] Review docs for accidental copied focus/zoom implementation details.
- [ ] Commit and push the branch.
