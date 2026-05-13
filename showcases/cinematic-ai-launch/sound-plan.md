# Sound Plan

## Intent

Sound cues should make a click feel like an edit point. They must stay subtle and should not compete with narration. The first version uses generated WAV files and local playback on step entry.

## Cue Map

| Step | Cue ID | File | Level | Purpose |
|---|---|---|---|---|
| 1 | low-hit | `public/sfx/low-hit.wav` | medium | Article lands on the stage. |
| 2 | soft-whoosh | `public/sfx/soft-whoosh.wav` | subtle | Workflow splits into islands. |
| 3 | data-pop | `public/sfx/data-pop.wav` | subtle | Pipeline nodes ignite. |
| 4 | tick | `public/sfx/tick.wav` | subtle | Script slices into beats. |
| 5 | data-pop | `public/sfx/data-pop.wav` | subtle | Motion cards activate. |
| 6 | lock | `public/sfx/lock.wav` | medium | Sound cues snap to the frame. |
| 7 | soft-whoosh | `public/sfx/soft-whoosh.wav` | subtle | Recording timeline opens. |
| 8 | lock | `public/sfx/lock.wav` | medium | Final output locks. |

## Implementation Notes

- Use `HTMLAudioElement` on step change.
- Start volume at `0.24`.
- Catch playback errors and continue navigation.
- Do not alter the base `useAudioPlayer` hook in the first version.
- Do not add background music in the first version.
