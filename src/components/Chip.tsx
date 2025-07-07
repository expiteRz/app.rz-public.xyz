import { ParentProps } from "solid-js";

export default (props: ParentProps) => {
  const defineColor = (version: string) =>
    `${version}`.toLowerCase().includes("pre")
      ? "bg-dev-chip text-dev-chip-text selection:bg-dev-chip-selection"
      : "bg-zr-650 test-zr-250";
  return (
    <div class={`${defineColor(props.children!.toString())} text-xs mx-2.5 my-1 p-1 rounded-sm`}>{props.children}</div>
  );
};
