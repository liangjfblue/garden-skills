import { useEffect } from "react";
import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./CinematicAiLaunch.css";

const cues = [
  "low-hit",
  "soft-whoosh",
  "data-pop",
  "tick",
  "data-pop",
  "lock",
  "soft-whoosh",
  "lock",
] as const;

const stepLabels = [
  "source impact",
  "fragmented workflow",
  "pipeline ignition",
  "script to beats",
  "motion treatment",
  "sound lock",
  "one-take record",
  "final artifact",
] as const;

const workflow = ["script", "PPT", "assets", "voice", "edit"];
const pipeline = ["script", "outline", "motion", "audio", "record"];
const beats = ["hook", "friction", "pipeline", "beats", "motion", "sound", "record", "lock"];
const motionCards = [
  ["data flow", "signals move"],
  ["path trace", "logic draws"],
  ["split compare", "before / after"],
  ["terminal replay", "process runs"],
  ["UI state", "screen changes"],
];
const soundCues = ["hit", "tick", "whoosh", "pop", "lock"];
const chain = ["article.md", "script.md", "motion-treatment.md", "presentation", "video.mp4"];
const focusCards = [
  {
    tag: "source",
    title: "Article In.",
    body: "The article enters the production surface as the source object.",
  },
  {
    tag: "old way",
    title: "Fragmented Workflow",
    body: "Script, PPT, assets, voice, and edit sit in separate islands.",
  },
  {
    tag: "pipeline",
    title: "One Path Out",
    body: "The work becomes one route: script, outline, motion, audio, record.",
  },
  {
    tag: "beats",
    title: "Script To Beats",
    body: "Each narration beat becomes one visual step.",
  },
  {
    tag: "motion",
    title: "Motion Treatment",
    body: "Each beat gets a dominant action instead of a bullet.",
  },
  {
    tag: "sound",
    title: "Sound Lock",
    body: "Quiet cues turn clicks into edit points.",
  },
  {
    tag: "record",
    title: "One Take",
    body: "Auto mode records the browser stage cleanly.",
  },
  {
    tag: "output",
    title: "video.mp4",
    body: "The chain resolves into a publishable video file.",
  },
] as const;

type IndexedStyle = CSSProperties & { "--i": number };

function indexed(index: number): IndexedStyle {
  return { "--i": index };
}

function playCue(id: (typeof cues)[number]) {
  if (typeof window === "undefined") return;
  const audio = new Audio(`${import.meta.env.BASE_URL}sfx/${id}.wav`);
  audio.volume = id === "low-hit" || id === "lock" ? 0.16 : 0.1;
  audio.play().catch(() => {});
}

function zoneClass(name: string, safeStep: number, focusStep: number) {
  return [
    "cal-zone",
    `cal-${name}-zone`,
    safeStep === focusStep ? "is-active" : "",
    safeStep > focusStep ? "is-complete" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function FrameLabel({ step }: { step: number }) {
  return (
    <div className="cal-frame-label label-mono">
      <span>0{step + 1}</span>
      <span>{stepLabels[step]}</span>
    </div>
  );
}

function SourceZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("source", safeStep, 0)}>
      <div className="cal-impact-ring" aria-hidden />
      <div className="cal-article-file">
        <div className="cal-file-top label-mono">article.md</div>
        <div className="cal-file-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="cal-source-copy">
        <p className="cal-kicker">web video presentation</p>
        <h1>
          <span>Article In.</span>
          <span>Video Out.</span>
        </h1>
        <p>把文章变成一条能发布的视频</p>
      </div>
    </section>
  );
}

function WorkflowZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("workflow", safeStep, 1)}>
      <svg className="cal-tangle" viewBox="0 0 520 260" aria-hidden>
        <path d="M32 58 C184 4 188 178 314 116 S432 24 492 88" />
        <path d="M58 226 C168 140 182 44 300 84 S410 244 486 202" />
        <path d="M28 150 C154 142 212 250 324 204 S430 112 500 144" />
      </svg>
      <p className="cal-kicker">old way</p>
      <h2>Too many tools. Too little rhythm.</h2>
      <div className="cal-islands">
        {workflow.map((item, index) => (
          <div className="cal-island card" key={item} style={indexed(index)}>
            <span className="label-mono">0{index + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function PipelineZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("pipeline", safeStep, 2)}>
      <div className="cal-pipeline-source card">
        <span className="label-mono">input</span>
        <strong>article.md</strong>
      </div>
      <div className="cal-pipeline-track" aria-hidden>
        <i />
      </div>
      <div className="cal-pipeline-nodes">
        {pipeline.map((node, index) => (
          <div className="cal-node" key={node} style={indexed(index)}>
            <span />
            <strong>{node}</strong>
          </div>
        ))}
      </div>
      <h2>One stage. One rhythm. One path out.</h2>
    </section>
  );
}

function ScriptZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("script", safeStep, 3)}>
      <div className="cal-script-panel card">
        <span className="label-mono">script.md</span>
        <p>一篇好文章，不应该只停在页面里。</p>
        <p>真正的视频感，是每一步都在演一件事。</p>
      </div>
      <div className="cal-beat-stack">
        {beats.map((beat, index) => (
          <div className="cal-beat" key={beat} style={indexed(index)}>
            <span className="label-mono">step {index + 1}</span>
            <strong>{beat}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function MotionZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("motion", safeStep, 4)}>
      <div className="cal-motion-core" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <p className="cal-kicker">motion treatment</p>
      <h2>Perform the idea.</h2>
      <div className="cal-motion-grid">
        {motionCards.map(([title, caption], index) => (
          <div className="cal-motion-card card" key={title} style={indexed(index)}>
            <span className="label-mono">{caption}</span>
            <strong>{title}</strong>
            <div className={`cal-mini cal-mini-${index}`} aria-hidden>
              <i />
              <i />
              <i />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AudioZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("audio", safeStep, 5)}>
      <div className="cal-sync-sweep" aria-hidden />
      <div className="cal-wave" aria-hidden>
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} style={indexed(index)} />
        ))}
      </div>
      <div className="cal-cues">
        {soundCues.map((cue, index) => (
          <div className="cal-cue" key={cue} style={indexed(index)}>
            <span />
            <strong>{cue}</strong>
          </div>
        ))}
      </div>
      <h2>Clicks become edit points.</h2>
    </section>
  );
}

function RecordZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("record", safeStep, 6)}>
      <div className="cal-record-frame">
        <div className="cal-rec-dot" />
        <span className="label-mono">REC · ?auto=1</span>
        <div className="cal-scanline" aria-hidden />
        <div className="cal-rec-stage">
          <strong>1920 x 1080</strong>
          <span>hidden chrome · one take</span>
        </div>
      </div>
      <div className="cal-record-rail">
        {Array.from({ length: 8 }).map((_, index) => (
          <i key={index} style={indexed(index)} />
        ))}
      </div>
    </section>
  );
}

function OutputZone({ safeStep }: { safeStep: number }) {
  return (
    <section className={zoneClass("output", safeStep, 7)}>
      <div className="cal-final-chain">
        {chain.map((item, index) => (
          <div className="cal-chain-item" key={item} style={indexed(index)}>
            <span className="label-mono">{index === chain.length - 1 ? "output" : "stage"}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
      <div className="cal-final-copy">
        <p className="cal-kicker">Article In. Video Out.</p>
        <h2>Not a slide deck. A recordable video stage.</h2>
        <p>这不是 PPT。这是一个可录屏的视频舞台。</p>
      </div>
    </section>
  );
}

function CenterFocusCard({ safeStep }: { safeStep: number }) {
  const card = focusCards[safeStep];

  return (
    <aside key={safeStep} className="cal-center-focus" aria-hidden>
      <span className="label-mono">{card.tag}</span>
      <strong>{card.title}</strong>
      <p>{card.body}</p>
    </aside>
  );
}

function SystemLines({ safeStep }: { safeStep: number }) {
  return (
    <svg className="cal-system-lines" viewBox="0 0 1920 1080" aria-hidden>
      <path className={safeStep >= 1 ? "is-lit" : ""} d="M380 268 C560 194 614 216 722 238" />
      <path className={safeStep >= 2 ? "is-lit" : ""} d="M984 252 C1092 290 1138 344 1188 438" />
      <path className={safeStep >= 3 ? "is-lit" : ""} d="M1194 514 C1078 600 886 610 766 694" />
      <path className={safeStep >= 4 ? "is-lit" : ""} d="M790 790 C936 862 1106 852 1246 768" />
      <path className={safeStep >= 5 ? "is-lit" : ""} d="M1508 734 C1580 632 1566 536 1486 446" />
      <path className={safeStep >= 6 ? "is-lit" : ""} d="M1402 332 C1260 192 1114 160 950 196" />
      <path className={safeStep >= 7 ? "is-lit" : ""} d="M1340 276 C1450 236 1542 252 1630 324" />
    </svg>
  );
}

export default function CinematicAiLaunch({ step }: ChapterStepProps) {
  const safeStep = Math.max(0, Math.min(7, step));
  const isBuildPage = safeStep < 4;

  useEffect(() => {
    playCue(cues[safeStep]);
  }, [safeStep]);

  return (
    <div className={`cal-root cal-step-${safeStep}`}>
      <FrameLabel step={safeStep} />
      <SystemLines safeStep={safeStep} />
      <div className="cal-signal-packet" aria-hidden>
        <span />
      </div>
      <div className="cal-focus-lens" aria-hidden />
      <div className={`cal-workbench ${isBuildPage ? "cal-page-build" : "cal-page-render"}`}>
        {isBuildPage ? (
          <>
            <SourceZone safeStep={safeStep} />
            <WorkflowZone safeStep={safeStep} />
            <PipelineZone safeStep={safeStep} />
            <ScriptZone safeStep={safeStep} />
          </>
        ) : (
          <>
            <MotionZone safeStep={safeStep} />
            <AudioZone safeStep={safeStep} />
            <RecordZone safeStep={safeStep} />
            <OutputZone safeStep={safeStep} />
          </>
        )}
      </div>
      <CenterFocusCard safeStep={safeStep} />
    </div>
  );
}
