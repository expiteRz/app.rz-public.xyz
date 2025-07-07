import { ParentProps } from "solid-js";
// import { MaxWidth } from "~/global";
import Subject from "./Subject";

export default function Container(
  props: ParentProps<{
    name: string;
    version: string;
    maxWidth?: string;
    colors?: "zr" | "mkw";
  }>,
) {
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
    <div id="app_holder" class={`${pColors()} ${pMaxWidth} p-6 mx-2 sm:mx-auto flex flex-col gap-4 border rounded-lg`}>
      <Subject name={props.name} version={props.version} />
      <hr class={pHrColor()} />
      {props.children}
    </div>
  );
}
