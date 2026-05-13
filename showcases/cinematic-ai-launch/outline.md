# Video Outline

> **主题**：`midnight-press` — 暗色电影感技术发布。
> **总时长**：约 75 秒（口播约 300 字 ÷ 4 字/秒）。
> **章节数**：1 章 / 8 步。

---

## 1. cinematic-ai-launch — Article In. Video Out.（8 steps · ~75s）

**信息池**：
- 问题：文章、产品更新、技术博客常常已经有视频素材的内容基础 —— 来源 article §1
- 旧流程：改口播、做 PPT、找素材、配音、剪辑五段断裂流程 —— 来源 article §3
- 损耗：清晰故事容易变成标题、项目符号和转场堆叠 —— 来源 article §4
- 新流程：article → script → beats → visual steps → recordable stage —— 来源 article §5-6
- 差异：动效围绕正在解释的想法设计，而不是套通用入场动画 —— 来源 article §5

**开发计划**：

- step 1 (~10s) — 黑场中一篇长文落入舞台，文章碎片悬浮，打出 `Article In. Video Out.`
- step 2 (~10s) — 旧工作流裂成五个孤岛：口播、PPT、素材、配音、剪辑。
- step 3 (~9s) — 文章进入中央 pipeline，script / outline / motion / audio 节点依次点亮。
- step 4 (~9s) — 口播文本被切成 beat blocks，每个 block 对应一个 step。
- step 5 (~12s) — beat blocks 变成不同 motion treatments：数据流、路径、对比、终端、UI。
- step 6 (~8s) — 声音 cue 进入时间线：hit / tick / whoosh / lock 和 narration 对齐。
- step 7 (~9s) — 自动播放轨道推进，录屏框锁住 16:9 舞台。
- step 8 (~8s) — article.md → script.md → motion-treatment.md → presentation → video.mp4 链路定格。

口播节选：
> 一篇好文章，不应该只停在页面里。
> 真正的视频感，不是让文字飞进来。而是每一步都在演一件事。
> 这不是 PPT。这是一个可录屏的视频舞台。

---

## 素材清单

### 1. cinematic-ai-launch
- ✓ 视觉素材全部用 CSS / SVG 生成，不依赖外部图片。
- ✓ 音效用 `scripts/make-sfx.mjs` 生成本地 WAV 文件。
- ✓ 背景、字体、颜色从 `midnight-press` token 继承。
