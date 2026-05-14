// ⚠️ 这是 anchor 参考代码，不会被任何项目编译。
//    抄到真实项目时（presentation/src/chapters/NN-complex-page/），
//    把下面的 import 改成：
//      import type { ChapterStepProps } from "../../registry/types";
import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../../templates/src/registry/types";
import "./chapter.css";

const zones = [
  {
    id: "surface",
    label: "Surface",
    title: "One page, four beats",
    body: "Keep the whole product surface visible so the viewer builds spatial memory.",
  },
  {
    id: "input",
    label: "Input",
    title: "Source arrives",
    body: "The first region becomes active while the rest of the page stays quiet.",
  },
  {
    id: "process",
    label: "Process",
    title: "Path lights up",
    body: "The signal travels through the system instead of cutting to a new slide.",
  },
  {
    id: "output",
    label: "Output",
    title: "Result locks",
    body: "Completed regions remain visible and the final state gets the emphasis.",
  },
] as const;

function zoneState(step: number, zoneStep: number) {
  if (step === zoneStep) return "active";
  if (step > zoneStep) return "complete";
  return "pending";
}

function zoneClass(step: number, zoneStep: number, id: string) {
  return `cps-zone cps-${id} is-${zoneState(step, zoneStep)}`;
}

function indexed(index: number): CSSProperties & { "--i": number } {
  return { "--i": index };
}

export default function ComplexPageStepsExample({ step }: ChapterStepProps) {
  const safeStep = Math.max(0, Math.min(zones.length - 1, step));
  const active = zones[safeStep];

  return (
    <section className={`cps-root cps-step-${safeStep}`}>
      <div className="cps-frame">
        <div className="cps-header">
          <span className="label-mono">complex page steps</span>
          <strong>{active.label}</strong>
        </div>

        <div className="cps-map" aria-hidden>
          <i />
          <i />
          <i />
        </div>

        {zones.map((zone, index) => (
          <article className={zoneClass(safeStep, index, zone.id)} key={zone.id} style={indexed(index)}>
            <span className="label-mono">{zone.label}</span>
            <h2>{zone.title}</h2>
            <p>{zone.body}</p>
          </article>
        ))}

        <div className="cps-signal" aria-hidden />
      </div>
    </section>
  );
}
