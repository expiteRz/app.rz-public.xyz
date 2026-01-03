/// <reference types="@solidjs/start/env" />

import { JSX } from "solid-js";

declare interface AppListInterface {
  type?: "app" | "redirect";
  category?: "mkw" | "fp";
  name?: string;
  url: string;
  component?: () => JSX.Element;
  seizureWarning?: boolean; // Temporarily method due to not supporting themes
  indev?: boolean;
}
