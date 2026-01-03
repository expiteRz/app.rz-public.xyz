import { Accessor, createEffect, createSignal, For, onCleanup, onMount, ParentProps } from "solid-js";
import { getCurrentCategory } from "~/lib/Category";

interface Props {
  id: string;
  defaultValue: number;
  options: string[];
  onChange?: (digit: number) => void;
  isReset?: Accessor<boolean>;
}

export default function MultiPicker({ id, defaultValue, options, onChange, isReset }: ParentProps<Props>) {
  const category = getCurrentCategory();
  const parentColor = () => {
    switch (category) {
      case "mkw":
        return "bg-mkw-500/10 border-mkw-600 hover:border-mkw-500";
      default:
        return "bg-zr-500/10 border-zr-600 hover:border-zr-500";
    }
  };
  const inactiveButtonColor = () => {
    switch (category) {
      case "mkw":
        return "hover:bg-mkw-500/30";
      default:
        return "hover:bg-zr-500/30";
    }
  };
  const activeButtonColor = () => {
    switch (category) {
      case "mkw":
        return "bg-mkw-500/30 hover:bg-mkw-500/45 hover:text-mkw-250";
      default:
        return "bg-zr-500/30 hover:bg-zr-500/45 hover:text-zr-250";
    }
  };

  /// Target elements ///
  let optionElements: HTMLButtonElement[] | undefined = new Array(options.length);

  /// Signals ///
  const [currentValue, setCurrentValue] = createSignal(defaultValue); // For display

  /// Post-processes ///
  onMount(() => init());
  createEffect(() => {
    // Value re-setting
    if (!isReset?.()) return;
    setCurrentValue(0);
  });

  /// Functions ///
  const init = () => {
    // Re-assign onclick when re-render
    for (let i = 0; i < options.length; i++) {
      if (!optionElements[i].onclick) optionElements[i].onclick = () => toggleOption(i);
    }

    onCleanup(() => {
      for (let i = 0; i < options.length; i++) {
        optionElements[i].onclick = null;
      }
    });
  };

  const toggleOption = (digit: number) => {
    onChange?.(digit);
    setCurrentValue((prev) => prev ^ (1 << digit)); // For display
  };

  const selectedValueColor = (i: number) => {
    return (currentValue() & (1 << i)) !== 0 ? activeButtonColor() : inactiveButtonColor();
  };

  return (
    <div class={`${parentColor()} grid grid-cols-3 border rounded-lg transition duration-250`}>
      <For each={options}>
        {(option, i) => (
          <button ref={optionElements[i()]} class={`${selectedValueColor(i())} transition duration-250 cursor-pointer p-2.5 text-center`}>
            {option}
          </button>
        )}
      </For>
    </div>
  );
}
