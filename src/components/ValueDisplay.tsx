import { ParentProps } from "solid-js";
import { getCurrentCategory } from "~/lib/Category";
import Copy from "./icons/Copy";

type Props = {
  id: string;
  label?: string;
  value: string;
  class?: string;
  onCopyToClipboard?: () => void;
};

export default function ValueDisplay(props: ParentProps<Props>) {
  const category = getCurrentCategory();
  const componentColor = () => {
    switch (category) {
      case "mkw":
        return "bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 hover:border-mkw-550 focus:border-mkw-550";
      default:
        return "bg-zr-500/20 hover:bg-zr-500/30 focus:bg-zr-500/30 hover:border-zr-550 focus:border-zr-550";
    }
  };
  const buttonColor = () => {
    switch (category) {
      case "mkw":
        return "hover:bg-mkw-400/30";
      default:
        return "hover:bg-zr-400/30";
    }
  };
  return (
    <div class="flex flex-col gap-1.5">
      {props.label && <strong>{props.label}</strong>}
      <div
        id={props.id}
        class={`${componentColor()} border-transparent transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden group ${props.class}`}>
        <span>{props.value}</span>
        {props.onCopyToClipboard ? (
          <button
            class={`${buttonColor()} absolute top-[50%] translate-y-[-50%] left-full group-hover:-translate-x-[112%] p-2 transition duration-250 rounded-md cursor-pointer`}
            onClick={props.onCopyToClipboard}>
            <Copy />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
