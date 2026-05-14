# Complex Page Steps Example

这个 example 展示"同一复杂页面 + 多个 step 逐区聚焦"的最小结构。

适用场景：

- 产品 UI walkthrough
- dashboard 讲解
- 系统架构 / pipeline
- 自动化流程

不要把它当成视觉模板。它只示范：

- 页面主体持续存在
- 每个 step 只有一个 active zone
- 已讲区域进入 complete 态
- 未讲区域保持 pending 态
- 焦点路径和 signal dot 带动视线

## Step 结构

| Step | Focus | 画面变化 |
|---|---|---|
| 0 | Surface | 整个 dashboard 出现，建立空间关系 |
| 1 | Input | source 区域点亮，显示输入对象 |
| 2 | Process | pipeline 区域点亮，路径自绘 |
| 3 | Output | result 区域点亮，输出状态锁定 |

## 关键代码

```tsx
function zoneState(step: number, zoneStep: number) {
  if (step === zoneStep) return "active";
  if (step > zoneStep) return "complete";
  return "pending";
}
```

真实项目中可以换掉所有文案、布局和视觉动作，但保留这个状态模型。

