import type { ChapterDef } from "./types";
import CinematicAiLaunch from "../chapters/01-cinematic-ai-launch/CinematicAiLaunch";
import { narrations } from "../chapters/01-cinematic-ai-launch/narrations";

export const CHAPTERS: ChapterDef[] = [
  {
    id: "cinematic-ai-launch",
    title: "Article In. Video Out.",
    narrations,
    Component: CinematicAiLaunch,
  },
];
