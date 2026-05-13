# Motion Treatment

`motion-treatment.md` 是章节开工前的导演处理稿。它不写 CSS 技法，
只回答一个问题：**这一 step 到底在画面里发生了什么变化？**

如果 treatment 看起来像"标题 + 卡片 + 入场动画"，不要进入 TSX/CSS。
先重写 treatment。

---

## 什么时候写

- Phase 2 进入单章开发前必写或必派生。
- 短片只有一章：写整片 `motion-treatment.md`。
- 多章项目：可以先写全片总表，也可以每章写一段 treatment。
- 如果用户要求声音或自动录屏质感，同时写 `sound-plan.md`。

---

## 表格格式

```markdown
| Step | Narrative Beat | Dominant Action | Transition In | Transition Out | Persistent Object | Extra Visual Information | Anti-PPT Risk |
|---|---|---|---|---|---|---|---|
```

字段要求：

| 字段 | 写什么 | 不要写什么 |
|---|---|---|
| `Step` | step 序号，必须对齐 `outline.md` / `narrations.ts` | 跳号、合并多个口播节拍 |
| `Narrative Beat` | 这一拍的叙事功能 | 大段口播原文 |
| `Dominant Action` | 画面里的主导动作，一个 step 只抓一个 | "文字出现"、"卡片淡入"这种默认入场 |
| `Transition In` | 上一步如何自然变成这一步 | 无动机切场 |
| `Transition Out` | 这一步如何把视线送到下一步 | "fade out" 这种空泛描述 |
| `Persistent Object` | 跨相邻 step 保持连续的对象、线、形状、帧、光点、数据包 | 每步全换一套静态画面 |
| `Extra Visual Information` | article / outline 信息池里可挂到画面的细节 | 口播已经说完的同一句话 |
| `Anti-PPT Risk` | 这一拍最容易滑向 PPT 的风险 | 空着不写 |

---

## 硬规则

- 每个 step 必须有一个主导动作。
- 文字是标签和强调，不是整屏主体。
- 至少有一个视觉对象跨相邻 step 延续，让观众眼睛有东西可追。
- step 不必永远切换整屏。讲复杂系统 / 产品界面 / 数据看板时，优先考虑
  "同一复杂页面 + 多个 step 逐区聚焦"：空间布局持续存在，step 只改变
  当前焦点、状态、高亮、连线和局部运动。
- 转场必须由故事动机驱动：合并、分裂、压缩、点亮、锁定、揭示、对照、
  交换、坍缩、扩展。
- 如果某 step 能被概括成"标题 + 几张卡片"，必须重设计。
- 重复网格 / 卡片只有在它们主动变形、排序、连线、对照或合并时才成立。
- motion treatment 不写具体 CSS 属性、keyframe 名、毫秒数。

---

## 可用动作词

优先从内容关系里找动作：

| 内容关系 | 可用动作 |
|---|---|
| 输入 → 输出 | 注入、压缩、转码、成形、封装 |
| 混乱 → 秩序 | 聚拢、对齐、解缠、归档、锁定 |
| 对比 / 冲突 | 撕开、分屏、碰撞、互斥、消隐 |
| 列表 / 流程 | 逐点点亮、沿线推进、节点接力、状态迁移 |
| 因果 | 触发、连锁、扩散、回流、落点 |
| 抽象概念 | 具象成文件、轨道、镜头框、数据包、信号线 |
| 复杂页面讲解 | 聚焦、降噪、框选、扫线、局部放大、状态切换、已讲区域归档 |

---

## 开工门槛

进入章节 TSX/CSS 前，逐项确认：

- [ ] 每个 step 都有 `Dominant Action`
- [ ] 每个 step 都有 `Transition Out`
- [ ] 至少一个 `Persistent Object` 能贯穿 2 个以上相邻 step
- [ ] 文字不是唯一视觉信息
- [ ] 每个 `Anti-PPT Risk` 都有对应规避方案
- [ ] treatment 和 `narrations.ts` 的 step 数一致

任一未过，先改 treatment，不要写代码。

---

## 参考样例

第一个完整样例来自 showcase：

```text
showcases/cinematic-ai-launch/motion-treatment.md
```

它的核心做法是用 `article.md -> script.md -> motion-treatment.md ->
presentation -> video.mp4` 这条对象链贯穿全章，让每一步都是同一条生产线
的下一次变形，而不是八张独立幻灯片。
