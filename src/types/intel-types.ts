import type { LucideIcon } from "lucide-react";

export type Model = "imi1" | "imi1c" | "imi2" | "imi2c" | "imi3" | "imi4" | "imioss" | "imiossc";
export type Persona =
  | "default"
  | "casual"
  | "creative"
  | "deep"
  | "dev"
  | "savage"
  | "productivity"
  | "study"
  | "debug"
  | "prompt_engineer";

export type ModelData = {
  label: string;
  value: Model;
  description: string;
};

export type PersonaData = {
  label: string;
  value: Persona;
  description: string;
  icon: LucideIcon;
};

export type SettingsData = {
  model : Model,
  persona : string
  customPrompt? : string
}