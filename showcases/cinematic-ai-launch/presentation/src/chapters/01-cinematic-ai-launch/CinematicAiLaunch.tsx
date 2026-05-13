import { useEffect, useMemo } from "react";
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

const pipeline = ["script", "outline", "motion", "audio", "record"];
const workflow = ["script", "PPT", "assets", "voice", "edit"];
const motionCards = [
  ["data flow", "signals move"],
  ["path trace", "logic draws"],
  ["split compare", "before / after"],
  ["terminal replay", "process runs"],
  ["UI state", "screen changes"],
];

type IndexedStyle = CSSProperties & { "--i": number };

function indexed(index: number): IndexedStyle {
  return { "--i": index };
}

function playCue(id: (typeof cues)[number]) {
  if (typeof window === "undefined") return;
  const audio = new Audio(`${import.meta.env.BASE_URL}sfx/${id}.wav`);
  audio.volume = id === "low-hit" || id === "lock" ? 0.28 : 0.2;
  audio.play().catch(() => {});
}

function FrameLabel({ step, label }: { step: number; label: string }) {
  return (
    <div className="cal-frame-label label-mono">
      <span>0{step + 1}</span>
      <span>{label}</span>
    </div>
  );
}

function TextFragments() {
  const fragments = [
    "launch notes",
    "product update",
    "technical blog",
    "article.md",
    "release memo",
    "case study",
    "long-form idea",
    "raw material",
  ];

  return (
    <div className="cal-fragments" aria-hidden>
      {fragments.map((fragment, index) => (
        <span key={fragment} style={indexed(index)}>
          {fragment}
        </span>
      ))}
    </div>
  );
}

function StepOne() {
  return (
    <section className="cal-scene cal-step-one">
      <FrameLabel step={0} label="cold open" />
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
      <TextFragments />
      <div className="cal-hero-lockup">
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

function StepTwo() {
  return (
    <section className="cal-scene cal-step-two">
      <FrameLabel step={1} label="old workflow" />
      <svg className="cal-tangle" viewBox="0 0 1920 1080" aria-hidden>
        <path d="M360 260 C720 120 740 620 1070 490 S1380 180 1560 360" />
        <path d="M420 800 C710 580 690 280 1010 360 S1330 810 1580 700" />
        <path d="M290 540 C610 530 760 880 1110 720 S1390 430 1650 520" />
      </svg>
      <div className="cal-islands">
        {workflow.map((item, index) => (
          <div className="cal-island card" key={item} style={indexed(index)}>
            <span className="label-mono">0{index + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
      <div className="cal-side-copy">
        <p className="cal-kicker">the old way</p>
        <h2>Too many tools. Too little rhythm.</h2>
      </div>
    </section>
  );
}

function StepThree() {
  return (
    <section className="cal-scene cal-step-three">
      <FrameLabel step={2} label="pipeline ignition" />
      <div className="cal-pipeline">
        <div className="cal-pipeline-source card">
          <span className="label-mono">input</span>
          <strong>article.md</strong>
        </div>
        <svg className="cal-pipe-line" viewBox="0 0 1120 180" aria-hidden>
          <path d="M20 90 H1100" />
        </svg>
        <div className="cal-pipeline-nodes">
          {pipeline.map((node, index) => (
            <div className="cal-node" key={node} style={indexed(index)}>
              <span />
              <strong>{node}</strong>
            </div>
          ))}
        </div>
      </div>
      <h2 className="cal-statement">One stage. One rhythm. One path out.</h2>
    </section>
  );
}

function StepFour() {
  const beats = ["hook", "friction", "pipeline", "beats", "motion", "sound", "record", "lock"];
  return (
    <section className="cal-scene cal-step-four">
      <FrameLabel step={3} label="script to beats" />
      <div className="cal-script-panel card">
        <span className="label-mono">script.md</span>
        <p>一篇好文章，不应该只停在页面里。</p>
        <p>以前你想做这件事，要拆成一堆工具。</p>
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

function StepFive() {
  return (
    <section className="cal-scene cal-step-five">
      <FrameLabel step={4} label="beats become motion" />
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
      <h2 className="cal-motion-title">Do not show the bullet. Perform the idea.</h2>
    </section>
  );
}

function StepSix() {
  const soundCues = ["hit", "tick", "whoosh", "pop", "lock"];
  return (
    <section className="cal-scene cal-step-six">
      <FrameLabel step={5} label="sound locks frame" />
      <div className="cal-audio-board">
        <div className="cal-wave" aria-hidden>
          {Array.from({ length: 36 }).map((_, index) => (
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
      </div>
      <h2>Clicks start feeling like edit points.</h2>
    </section>
  );
}

function StepSeven() {
  return (
    <section className="cal-scene cal-step-seven">
      <FrameLabel step={6} label="one-take recording" />
      <div className="cal-record-frame">
        <div className="cal-rec-dot" />
        <span className="label-mono">REC · ?auto=1</span>
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

function StepEight() {
  const chain = ["article.md", "script.md", "motion-treatment.md", "presentation", "video.mp4"];
  return (
    <section className="cal-scene cal-step-eight">
      <FrameLabel step={7} label="final lockup" />
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

export default function CinematicAiLaunch({ step }: ChapterStepProps) {
  const safeStep = Math.max(0, Math.min(7, step));
  const scenes = useMemo(
    () => [
      <StepOne key="one" />,
      <StepTwo key="two" />,
      <StepThree key="three" />,
      <StepFour key="four" />,
      <StepFive key="five" />,
      <StepSix key="six" />,
      <StepSeven key="seven" />,
      <StepEight key="eight" />,
    ],
    [],
  );

  useEffect(() => {
    playCue(cues[safeStep]);
  }, [safeStep]);

  return <div className={`cal-root cal-step-${safeStep}`}>{scenes[safeStep]}</div>;
}
