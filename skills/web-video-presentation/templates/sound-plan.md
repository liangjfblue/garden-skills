# Sound Plan

## Intent

用 2-4 句话说明声音要提供什么感觉：剪辑点、落地感、锁定感、节奏感，
以及它如何不抢旁白。

## Cue Map

| Step | Cue ID | File | Level | Purpose |
|---|---|---|---|---|
| 1 |  | `TBD` | subtle |  |

## Implementation Notes

- 初始 cue volume 建议从 `0.10` 到 `0.16` 起步。
- 音效必须服从旁白，不要覆盖下一句。
- 播放失败要静默降级，不能阻塞翻页。
- 背景音乐、ducking、多轨混音和精确帧同步留到后期阶段。
