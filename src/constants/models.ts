import type { ModelData, PersonaData } from "@/types/intel-types";
import {
  Sparkles,
  Smile,
  Paintbrush,
  Brain,
  Code2,
  Flame,
  CheckCircle2,
  BookOpenText,
  Bug,
  Settings2,
} from "lucide-react";

export const models: ModelData[] = [
  {
    label: "IMI 1",
    value: "imi1",
    description: "Quick chats and simple tasks",
  },
  {
    label: "IMI 1c",
    value: "imi1c",
    description: "Creative and lightweight",
  },
  {
    label: "IMI 2",
    value: "imi2",
    description: "Balanced and versatile",
  },
  {
    label: "IMI 2c",
    value: "imi2c",
    description: "All rounder",
  },
  {
    label: "IMI 3",
    value: "imi3",
    description: "Smarter with deeper reasoning",
  },
  {
    label: "IMI 4",
    value: "imi4",
    description: "Best for coding and analysis",
  },
  {
    label: "IMI OSS",
    value: "imioss",
    description: "Latest Super AI model",
  },
  {
    label: "IMI OSSc",
    value: "imiossc",
    description: "Creative OSS model",
  },
];

export const personas: PersonaData[] = [
  {
    label: "Default",
    value: "default",
    description: "Balanced and neutral",
    icon: Sparkles,
  },
  {
    label: "Casual Chat",
    value: "casual",
    description: "Chill and friendly",
    icon: Smile,
  },
  {
    label: "Creative Mode",
    value: "creative",
    description: "For writing and ideas",
    icon: Paintbrush,
  },
  {
    label: "Thinker Mode",
    value: "deep",
    description: "Detailed and thoughtful",
    icon: Brain,
  },
  {
    label: "Dev Mode",
    value: "dev",
    description: "Coding-focused",
    icon: Code2,
  },
  {
    label: "Savage Mode",
    value: "savage",
    description: "Sarcastic and bold",
    icon: Flame,
  },
  {
    label: "Productivity Mode",
    value: "productivity",
    description: "Focused and actionable",
    icon: CheckCircle2,
  },
  {
    label: "Study Mode",
    value: "study",
    description: "Simplified explanations",
    icon: BookOpenText,
  },
  {
    label: "Debug Mode",
    value: "debug",
    description: "Helps fix code",
    icon: Bug,
  },
  {
    label: "Prompt Engineer",
    value: "prompt_engineer",
    description: "Prompt crafting expert",
    icon: Settings2,
  },
];
