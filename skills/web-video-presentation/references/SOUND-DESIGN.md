# Sound Design

`sound-plan.md` 是可选的声音意图稿。它的目标不是先做完整混音系统，
而是让每次点击 / 自动推进像一个视频剪辑点，而不是网页翻页。

---

## 什么时候写

- 用户明确要音效、产品发布感、电影感、录屏成片感时写。
- 章节 motion treatment 已经明确有强 edit point 时写。
- 没有旁白音频时也可以写，但音效仍然要克制。
- 背景音乐、ducking、多轨混音、精确帧同步属于后期阶段，先不要做成
  默认工程复杂度。

---

## Cue Plan 格式

```markdown
| Step | Cue ID | File | Level | Purpose |
|---|---|---|---|---|
```

字段要求：

| 字段 | 写什么 |
|---|---|
| `Step` | step 序号，必须和 motion treatment / narrations 对齐 |
| `Cue ID` | 语义化名称，如 `low-hit` / `soft-whoosh` / `lock` |
| `File` | 目标文件路径；没有素材时写 `TBD` |
| `Level` | `subtle` / `medium`，默认从 `subtle` 开始 |
| `Purpose` | 声音要制造的感觉：落地、点亮、锁定、打开、切换、收束 |

---

## 音量规则

- 音效必须服从旁白，不能抢词。
- 本地 step cue 的初始音量建议从 `0.10` 到 `0.16` 起步。
- `medium` 也只是相对更明显，不等于很响。
- 如果用户反馈"音效存在感强"，优先降整体 cue volume，不要先换素材。
- 旁白合成后的最终音量校准，留到录屏 / 后期阶段。

---

## 设计规则

- 声音 cue 应该强化 step change 是一个剪辑点。
- cue 的目的要先写 feeling，再决定文件名。
- 不要每步都用同一种声音；重复声音必须有叙事理由。
- 不要用长尾音效覆盖下一句旁白。
- 不要为了炫技加 UI hover / button click 小音效；这是录屏视频，不是工具软件。
- 播放失败必须静默降级，不能阻塞翻页。

---

## 轻量实现建议

第一版只需要 step 进入时播放短 WAV / MP3：

- 用 `HTMLAudioElement` 或局部 hook。
- catch autoplay / playback error 并继续导航。
- 不改基础旁白播放器，除非项目已经进入完整音频系统阶段。
- 所有 cue 文件放在 `public/sfx/` 或章节约定的静态目录。

---

## 参考样例

第一个完整样例来自 showcase：

```text
showcases/cinematic-ai-launch/sound-plan.md
```

注意：样例早期使用过 `0.24`，实测偏响。新项目默认按 `0.10` 到
`0.16` 起步。

