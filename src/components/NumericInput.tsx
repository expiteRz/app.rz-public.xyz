import { Accessor, createEffect, createSignal, onCleanup, onMount, ParentProps } from "solid-js";
import { getCurrentCategory } from "~/lib/Category";
import AngleLeft from "./icons/AngleLeft";
import AngleRight from "./icons/AngleRight";

interface Props {
  id: string;
  defaultValue: number;
  min: number;
  max: number;
  onChange?: (value: number) => void;
  isReset?: Accessor<boolean>;
}

export default function NumericInput({ id, defaultValue, min = 0, max = 100, onChange, isReset }: ParentProps<Props>) {
  const category = getCurrentCategory();
  const parentColor = () => {
    switch (category) {
      case "mkw":
        return "bg-mkw-500/10 border-mkw-600 hover:border-mkw-500";
      default:
        return "bg-zr-500/10 border-zr-600 hover:border-zr-500";
    }
  };
  const buttonColor = () => {
    switch (category) {
      case "mkw":
        return "hover:bg-mkw-500/30";
      default:
        return "hover:bg-zr-500/30";
    }
  };

  /// Target elements ///
  let decreaseButton: HTMLButtonElement | undefined;
  let increaseButton: HTMLButtonElement | undefined;
  let labelElement: HTMLDivElement | undefined;

  /// Signals ///
  const [currentValue, setCurrentValue] = createSignal(defaultValue);

  /// Post-processes ///
  onMount(() => {
    if (decreaseButton) decreaseButton.onclick = () => decreaseFunc();
    if (increaseButton) increaseButton.onclick = () => increaseFunc();

    onCleanup(() => {
      if (decreaseButton) decreaseButton.onclick = null;
      if (increaseButton) increaseButton.onclick = null;
    });
  });

  createEffect(() => {
    if (!isReset?.()) return;
    setCurrentValue(0);
  });

  /// Functions ///
  const decreaseFunc = () => {
    setCurrentValue((prev) => (prev > min ? prev - 1 : min));
    onChange?.(currentValue());
  };
  const increaseFunc = () => {
    setCurrentValue((prev) => (prev < max ? prev + 1 : max));
    onChange?.(currentValue());
  };

  return (
    <div id={id} class={`${parentColor()} grid grid-cols-3 border rounded-lg transition duration-250`}>
      <button ref={decreaseButton} class={`${buttonColor()} transition duration-250 cursor-pointer`}>
        <AngleLeft className="m-auto" size={20} />
      </button>
      <div ref={labelElement} class="p-2.5 text-center">
        {currentValue()}
      </div>
      <button ref={increaseButton} class={`${buttonColor()} transition duration-250 cursor-pointer`}>
        <AngleRight className="m-auto" size={20} />
      </button>
    </div>
  );
}
