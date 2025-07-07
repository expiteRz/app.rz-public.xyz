import { Meta, Title as T } from "@solidjs/meta";
import { ParentProps } from "solid-js";

export const Title = (props: ParentProps) =>
  props.children ? <T>{props.children} - app.rz-public.xyz</T> : <T>app.rz-public.xyz</T>;

export const Description = (props: ParentProps) => <Meta name="description" content={`${props.children}`} />;
