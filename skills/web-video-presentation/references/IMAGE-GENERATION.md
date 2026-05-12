# GPT Image 2 生图流程

本流程把 GPT Image 2 生图纳入稳定生产链路：

```text
outline.md -> asset-plan.md -> image-prompts.md -> generate-images.mjs
           -> assets/ -> image-manifest.json -> React 章节引用
```

核心原则：先规划素材，再写 prompt，再批量生成。不要在章节开发时临时口头
让模型“随便生成一张图”。

## 产物

```text
asset-plan.md          # 每章需要什么图，先给人审核
image-prompts.md       # 每个素材 ID 对应一个完整 prompt
image-manifest.json    # 记录素材路径、状态、模型和 task id
assets/                # 生成图片输出目录
```

推荐目录：

```text
assets/
├── cover/
├── chapters/
│   ├── 01-hook/
│   ├── 02-mechanism/
│   └── 03-case/
├── references/
└── prompts/
```

## asset-plan.md 写法

每个素材至少写：

```md
## 01-hook-cover

- 用途: 开场主视觉
- 对应 step: 1-2
- 画面任务: 一眼表达“AI 工具突然爆火”
- 类型: cover
- 构图: 横屏 16:9，右侧留标题区
- 必须出现: 产品界面感、增长曲线、用户关注
- 禁止出现: 真实 logo、杂乱人群、英文水印
- 优先级: high
```

## image-prompts.md 写法

每个二级标题是一个素材 ID，正文是完整 prompt：

```md
## 01-hook-cover

用途：视频开场主视觉

场景：
一个 AI 工具在短时间内获得大量关注的商业分析画面。

主体：
一个抽象化的软件产品界面、增长曲线、用户关注热度。

关键细节：
1. 左侧是简洁的软件界面轮廓
2. 中间有上升的数据曲线
3. 右侧留出标题文字区域

构图：
横屏 16:9，右侧留白。

风格：
克制、现代、商业分析、干净信息图感。

约束：
不要真实品牌 logo，不要水印，不要多余文字，不要杂乱背景。
```

## 运行

脚手架项目内置 APIMart GPT Image 2 脚本：

第一次使用：

```bash
cp .env.example .env
```

然后在 `.env` 里填：

```text
APIMART_API_KEY=sk-...
```

之后直接运行：

```bash
npm run generate-images
```

常用命令：

```bash
npm run generate-images -- --dry-run
npm run generate-images -- --id=01-hook-cover
npm run generate-images -- --force
npm run test:images
```

默认请求体：

```json
{
  "model": "gpt-image-2",
  "prompt": "...",
  "n": 1,
  "size": "16:9",
  "resolution": "2k"
}
```

可用环境变量覆盖：

```bash
IMAGE_SIZE=9:16 IMAGE_RESOLUTION=2k npm run generate-images
```

## APIMart 接口

提交地址：

```text
POST https://api.apimart.ai/v1/images/generations
```

脚本按 APIMart 的异步任务模式处理：

1. 提交 prompt，读取 `data[0].task_id`
2. 轮询 `GET https://api.apimart.ai/v1/tasks/<task_id>`
3. 从 `data.result.images[0].url[0]` 读取图片 URL
4. 下载图片到 `assets/`
5. 写入 `image-manifest.json`

API Key 通过 `APIMART_API_KEY` 提供。脚本会先读系统环境变量，再读项目根
目录 `.env`；已有系统环境变量优先级更高。

`.env` 已在脚手架 `.gitignore` 中忽略。不要把真实 key 写进模板文件、
prompt、manifest 或提交记录。

## 审核

生成后至少检查：

- 是否承接口播内容
- 是否适合叠字
- 是否有水印、乱码文字、错误 logo
- 是否和同一期风格一致
- 是否符合目标平台画幅
- 是否需要重生成或局部编辑

审核通过后，把 `image-manifest.json` 对应素材的 `status` 从
`generated` 改成 `approved`。脚本默认不会覆盖 `approved` 素材，除非传
`--force`。
