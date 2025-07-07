/// <reference types="@solidjs/start/env" />

import { JSX } from "solid-js";

declare interface AppListInterface {
    name?: string;
    path: string;
    component: () => JSX.Element;
    seizureWarning?: boolean; // Temporarily method due to not supporting themes
}
