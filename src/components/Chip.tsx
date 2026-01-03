import { ParentProps } from "solid-js";

export default (props: ParentProps<{ indev?: boolean; color?: "zr" | "mkw" }>) => {
  // const defineColor = (version: string) =>
  //   `${version}`.toLowerCase().includes("pre") ? "bg-dev-chip text-dev-chip-text selection:bg-dev-chip-selection" : "bg-zr-650 test-zr-250";
  const defineColor = () => {
    if (props.indev) return "bg-dev-chip text-dev-chip-text selection:bg-dev-chip-selection";
    else
      switch (props.color) {
        case "mkw":
          return "bg-mkw-650 test-mkw-250";
        default:
          return "bg-zr-650 test-zr-250";
      }
  };

  return <div class={`${defineColor()} text-xs mx-2.5 my-1 p-1 rounded-sm`}>{props.children}</div>;
};
