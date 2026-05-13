import type { ChapterStepProps } from "../../registry/types";
import "./CinematicAiLaunch.css";

export default function CinematicAiLaunch({ step }: ChapterStepProps) {
  return (
    <div className="cal-scene scene-pad">
      <div className="cal-kicker">Cinematic AI Launch</div>
      <h1 className="cal-temp-title">Step {step + 1}</h1>
      <p className="cal-temp-copy">
        Temporary chapter shell. The full cinematic scene is implemented in a later task.
      </p>
    </div>
  );
}
