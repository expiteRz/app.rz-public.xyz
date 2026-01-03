import { Meta } from "@solidjs/meta";
import { JSX, ParentProps, Show } from "solid-js";
import { Description, Title } from "./SEO";
import Subject from "./Subject";

type Props = ParentProps<{
  name: string;
  version: string;
  indev?: boolean;
  description?: string;
  maxWidth?: string;
  colors?: "zr" | "mkw";
  ribbon?: JSX.Element;
}>;

export default function Container(props: Props) {
  const pMaxWidth = props.maxWidth ?? "md:container";
  const pColors = () => {
    switch (props.colors) {
      case "mkw":
        return "bg-mkw-500/20 border-mkw-700";
      default:
        return "bg-zr-500/20 border-zr-700";
    }
  };
  const pHrColor = () => (props.colors ? `border-${props.colors}-600` : "border-zr-600");

  return (
    <>
      <Title>{props.name}</Title>
      {props.description ? <Description>{props.description}</Description> : <></>}
      <Meta name="versionApp" content={props.version} />
      <div id="app_holder" class={`${pColors()} ${pMaxWidth} p-6 mx-auto flex flex-col gap-4 border rounded-lg`}>
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-0">
          <Subject name={props.name} version={props.version} color={props.colors} indev={props.indev} />
          <Show when={props.ribbon}>
            <div class="flex-none ml-auto mr-0">{props.ribbon}</div>
          </Show>
        </div>
        <hr class={pHrColor()} />
        {props.children}
      </div>
    </>
  );
}
