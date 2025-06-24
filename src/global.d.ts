/// <reference types="@solidjs/start/env" />

import { JSX } from "solid-js";

declare interface AppListInterface {
    name?: string;
    path: string;
    component: () => JSX.Element;
    seizureWarning?: boolean; // Temporarily method due to not supporting themes
}

declare type MaxWidth = "max-w-3xs" | "max-w-2xs" | "max-w-xs" | "max-w-sm" | "max-w-md" | "max-w-lg" | "max-w-xl" | "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" | "max-w-full" | "container";
