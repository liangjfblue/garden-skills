# Complex Page Steps

复杂页面多 step 聚焦模式，用来讲一个持续存在的页面、系统图、看板或链路。

核心不是换一整屏，而是：

```text
one persistent page + multiple step-level focus changes
```

这不是从 `cinematic-focus-zoom-showcase` 合并代码。那个分支只是证明了方向。
这里沉淀的是通用模式，不绑定它的绝对定位、中心卡片或视觉样式。

---

## 什么时候用

适合：

- 产品 UI / SaaS 后台 / 编辑器界面讲解
- 数据看板 / 监控页 / BI dashboard
- 系统架构 / 工作流 / 工具链
- 商业模式图 / 组织关系图 / 交易链路
- 代码执行过程 / agent pipeline / 自动化流程

共同特征：观众需要记住空间关系。如果每个 step 都换一屏，反而会丢上下文。

---

## 什么时候不用

不适合：

- 开场 hook，需要强冲击的一屏
- 章节转折，需要硬切镜头
- 一句金句 / 一个 hero 数字
- 多个完全不同的案例
- 视觉主体本身每一步都应该变形为新对象

这些场景继续用 full-screen scene。

---

## 基本模型

一个复杂页面里，每个区域有三种状态：

| State | 含义 | 视觉处理 |
|---|---|---|
| `active` | 当前口播正在讲 | 高对比、焦点框、连线、局部运动 |
| `complete` | 已经讲过 | 降低对比，但保留可识别上下文 |
| `pending` | 还没讲 | 更低对比，保持安静 |

step 仍然来自 `narrations.ts`。不要因为同一页讲解就合并口播节拍。

---

## 最小 TSX 模式

```tsx
function zoneState(step: number, zoneStep: number) {
  if (step === zoneStep) return "active";
  if (step > zoneStep) return "complete";
  return "pending";
}

export function Chapter({ step }: { step: number }) {
  return (
    <section className="cp-root">
      <div className={`cp-zone is-${zoneState(step, 0)}`}>Input</div>
      <div className={`cp-zone is-${zoneState(step, 1)}`}>Process</div>
      <div className={`cp-zone is-${zoneState(step, 2)}`}>Output</div>
    </section>
  );
}
```

这个 helper 是模式，不是框架。真实章节可以按内容写自己的 zone 名称和布局。

---

## 最小 CSS 模式

```css
.cp-zone {
  opacity: .22;
  filter: saturate(.5);
  transition: opacity 420ms ease, filter 420ms ease, border-color 420ms ease;
}

.cp-zone.is-active {
  opacity: 1;
  filter: saturate(1);
  border-color: var(--accent);
}

.cp-zone.is-complete {
  opacity: .56;
  filter: saturate(.7);
}
```

只把状态关系固定下来。具体视觉可以是焦点框、扫线、路径自绘、信号点、
局部放大、状态切换或数据包移动。

---

## Motion Treatment 写法

复杂页面模式下，`motion-treatment.md` 的重点字段：

| 字段 | 写法 |
|---|---|
| `Dominant Action` | 当前区域发生什么状态变化 |
| `Transition In` | 焦点如何从上一区域移动过来 |
| `Transition Out` | 视线如何被送到下一区域 |
| `Persistent Object` | 通常是整张页面、主路径、数据包、光标、镜头框 |
| `Extra Visual Information` | 当前区域补充的字段、数值、标签、状态 |
| `Anti-PPT Risk` | 页面过密、全部同时高亮、只靠标题解释 |

可以把 `Persistent Object` 写成：

```text
dashboard surface
system map
workflow rail
signal packet
recording frame
```

---

## 视觉注意力工具

优先选一种主工具贯穿整段，不要每 step 换花样：

- focus frame：当前区域边框 / 镜头框
- signal packet：一个点 / 小块沿路径移动
- path draw：线条从上一步画到下一步
- scanline：扫过当前区域并触发状态变化
- dimming：非当前区域降噪
- local zoom：只在关键区域轻微放大，不要每步弹大卡
- state badge：pending / active / done 状态迁移

中心卡片只是可选手段。用多了会重新变成 PPT。

---

## 反模式

- 页面一开始把所有区域都高对比展示。
- 每个 step 只是移动一个发光框，区域内容本身没有变化。
- 每步都弹同一种中心卡片。
- active 区域太小，录屏后观众看不清。
- complete 区域完全消失，导致观众失去空间记忆。
- pending 区域抢戏。
- 依赖鼠标光标指哪讲哪。录屏时没有光标也要成立。
- 同一页塞入太多文字，变成复杂 PPT。

---

## 和音频 / Auto 模式的关系

- 一个 narration 仍然对应一个 step。
- 动画必须在该 step 的口播时长内完成。
- 音效 cue 可以跟随焦点移动、锁定、路径点亮或状态完成。
- 不需要改 audio extraction 或 `?auto=1`。

---

## 参考例子

小型结构示例：

```text
references/EXAMPLES/complex-page-steps/
```

完整 cinematic 实验只作为灵感，不作为模板：

```text
cinematic-focus-zoom-showcase
```

