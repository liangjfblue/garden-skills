# Cinematic Web Video Showcase Design

## Purpose

Build an independent showcase for `web-video-presentation` that proves the skill can produce a true video-like result, not just an improved slide deck.

The showcase is a commercial sample first and an internal learning artifact second. It should be good enough to show potential customers as evidence that an article, changelog, or product note can become a publishable short-form video with cinematic motion, transitions, and sound cues.

## Scope

Create a standalone showcase project under:

```text
showcases/cinematic-ai-launch/
├── article.md
├── script.md
├── outline.md
├── motion-treatment.md
├── sound-plan.md
└── presentation/
```

The showcase presents `web-video-presentation` itself as a product:

```text
Article In. Video Out.
把文章变成一条能发布的视频
```

The first version keeps the existing Vite + React + TypeScript stage model and click-driven stepper. It does not turn the template into a full timeline video engine.

## Non-Goals

- Do not replace the base skill template with this showcase.
- Do not build a generalized motion component library before the showcase proves which patterns are useful.
- Do not redesign the existing narration/audio pipeline.
- Do not add GSAP, Three.js, Remotion, or a timeline engine unless CSS/SVG/React are clearly insufficient during implementation.
- Do not make a broad tutorial. The output should feel like a commercial product launch sample.

## Success Criteria

- The first screen does not read as PPT: no static title plus cards composition.
- Every step has a dominant visual action, not just text fade-in or slide-in.
- The piece includes visible transitions, motion continuity, and at least lightweight sound cues.
- The result can be screen-recorded as a 60-90 second short video.
- The project preserves the intermediate artifacts needed to improve the skill: `script.md`, `outline.md`, `motion-treatment.md`, and `sound-plan.md`.
- After completion, the team can extract concrete updates for `CHAPTER-CRAFT.md`, a new `MOTION-TREATMENT.md`, and a future `SOUND-DESIGN.md`.

## Content Structure

The showcase is one cinematic chapter with eight steps.

### Step 1 - Cold Open

A long article file drops into a dark stage. Text fragments burst outward and hang in space.

Narrative beat: a good article should not stay trapped on a page.

Dominant action: file impact and text-particle scatter.

Sound cue: low hit.

### Step 2 - Old Workflow Friction

The screen splits into five isolated workflow islands: script writing, slide making, asset hunting, voiceover, and editing. The lines between them tangle.

Narrative beat: turning one article into a video used to require too many disconnected tools.

Dominant action: island split and line tangle.

Sound cue: soft whoosh or friction glitch.

### Step 3 - Pipeline Ignition

The article enters a central pipeline. Nodes light up in sequence: script, outline, motion, audio, recording.

Narrative beat: the article now moves through one video-stage pipeline.

Dominant action: node ignition and energy flow.

Sound cue: data pop.

### Step 4 - Script Becomes Beats

Raw paragraphs compress into beat blocks. Each block maps to one visual step.

Narrative beat: narration is not just text; it defines every screen advance.

Dominant action: text slicing and beat-block alignment.

Sound cue: tick.

### Step 5 - Beats Become Motion

Beat blocks transform into different motion treatments: data flow, path tracing, split comparison, terminal replay, and UI state changes.

Narrative beat: every step should perform an idea instead of showing a bullet.

Dominant action: motion cards morphing into animated demonstrations.

Sound cue: data pop.

### Step 6 - Sound Locks the Frame

A lightweight audio lane appears: narration plus hit, tick, whoosh, lock, and ambience cues. Cue points snap to the step rhythm.

Narrative beat: sound makes a click feel like an edit point instead of a slide advance.

Dominant action: waveform and cue markers locking to frames.

Sound cue: lock.

### Step 7 - One-Take Recording

The whole sequence becomes an auto-play recording track. The cursor advances left to right, and a recording frame locks around the stage.

Narrative beat: auto mode turns the web stage into a one-take recording flow.

Dominant action: timeline advance and recording-frame lock.

Sound cue: soft whoosh.

### Step 8 - Final Lockup

The pipeline freezes into a final chain:

```text
article.md -> script.md -> motion-treatment.md -> presentation -> video.mp4
```

Narrative beat: this is not a slide deck; it is a recordable video stage.

Dominant action: artifacts converging into the final lockup.

Sound cue: lock.

## Motion Design

The showcase should use `midnight-press` as the visual starting point: warm dark background, hot accent, cinematic pacing, and editorial typography.

Each step must answer three questions before implementation:

1. What change is being performed on screen?
2. What visual object persists across the cut or transition?
3. What element carries the viewer's eye into the next step?

Preferred implementation tools:

- CSS keyframes and transitions for reveal, impact, and continuity.
- SVG path drawing for pipelines, tangled lines, cue tracks, and recording frames.
- React step state for scene switching and controlled visual states.
- Canvas only if the text-fragment scatter needs more organic motion than CSS/SVG can provide.

Motion anti-patterns for this showcase:

- Static title plus three cards.
- Full-step fade-in as the primary action.
- Repeating the same animation vocabulary across all steps.
- Decorative motion that does not explain a relationship.
- Pure text screens.

## Sound Design

Sound is implemented locally inside the showcase, not as a template-wide audio architecture change.

Suggested files:

```text
presentation/public/sfx/
├── low-hit.mp3
├── soft-whoosh.mp3
├── tick.mp3
├── data-pop.mp3
├── lock.mp3
└── room-tone.mp3
```

The first version can use a simple step-cue registry:

```ts
const stepCues = [
  "low-hit",
  "soft-whoosh",
  "data-pop",
  "tick",
  "data-pop",
  "lock",
  "soft-whoosh",
  "lock",
];
```

Playback can be a local `HTMLAudioElement` call on step change with volume between `0.15` and `0.35`.

The first version does not need:

- multitrack mixing
- ducking narration under effects
- millisecond-level sync
- fade curves
- a shared sound API in the base template

`sound-plan.md` should record the reason for each cue so the implementation can later inform a proper `SOUND-DESIGN.md`.

## Artifacts

### `article.md`

A short source article describing the problem and promise:

- Articles are easier to write than videos.
- Video production fragments across tools.
- Slide-based conversion looks flat.
- A video-stage pipeline can preserve content while adding motion, rhythm, and sound.

### `script.md`

A 60-90 second launch-style narration. It should be conversational, direct, and free of self-describing feature-list language.

### `outline.md`

An eight-step outline that describes screen content and timing estimates only. It must not prescribe exact animation implementation details.

### `motion-treatment.md`

The key new artifact. For each step, it records:

- narrative beat
- dominant visual action
- transition in
- transition out
- persistent visual object
- visual information that is not spoken in narration
- anti-PPT risk

### `sound-plan.md`

For each step, it records:

- cue name
- sound asset
- intended feeling
- approximate trigger point
- whether the cue should be subtle, medium, or prominent

## Implementation Approach

1. Create the showcase directory and write the content artifacts first.
2. Scaffold a standalone `presentation/` using the existing `midnight-press` theme.
3. Replace the example chapter with one `cinematic-ai-launch` chapter.
4. Implement the eight-step scene with isolated CSS and local assets.
5. Add local step-level sound cue playback inside the showcase.
6. Verify typecheck and browser playback.
7. Record or inspect the sequence end to end.
8. Summarize what should be folded back into the skill documentation.

## Testing And Verification

Minimum verification:

- `npx tsc --noEmit` passes inside the showcase presentation.
- The chapter has exactly eight narration entries and eight visual steps.
- Every step has at least one non-text visual mechanism.
- Step sound cues trigger without blocking navigation if autoplay restrictions prevent playback.
- The showcase can be played manually with click/arrow navigation.
- The sequence remains recordable with hidden chrome.

Manual review checklist:

- Does the first screen immediately feel like a product launch video?
- Does every step perform an idea?
- Are transitions motivated by the story?
- Are sound cues subtle enough not to feel like UI noise?
- Would this sample help sell article-to-video production work?

## Follow-Up Skill Upgrades

After the showcase works, update the skill in a second phase:

- Add `references/MOTION-TREATMENT.md`.
- Add `references/SOUND-DESIGN.md`.
- Update `CHAPTER-CRAFT.md` so action treatment happens before chapter coding.
- Add stronger anti-PPT checks to the chapter completion checklist.
- Extract only the motion patterns that proved useful in the showcase.

Potential extracted patterns:

- `PipelineIgnition`
- `BeatSlicer`
- `MotionMap`
- `SoundTimeline`
- `RecordingTrack`
- `FinalLockup`

These should be extracted after the showcase is complete, not before.
