import { Accessor, createEffect, createSignal, For, Match, onMount, ParentProps, Show, Switch } from "solid-js";
import AngleDown from "./icons/AngleDown";

type ListType = {
  exactId: number;
  label: string;
};

function isListType(value: string | ListType) {
  if (typeof value === "string") return false;
  if ("label" in value && "exactId" in value) return true;
}

interface Props<T extends string | ListType> {
  id: string;
  list: T[] | Accessor<T[]>;
  selectedIndex: Accessor<number>;
  selectedIndexParent?: Accessor<number>;
  onSelect?: (index: number) => void;
  isReset?: Accessor<boolean>;
  onReset?: () => void;
}

/**
 * Any parameter needed for initial setting
 * @param id - Attribute to identify a single element. For this project, the attribute is needed to update the element
 * @param list - Attach the selectable values
 * @param selectedIndex - Index to selected value from list
 * @param selectedIndexSecondary - Index to parent array from multidimentional array
 * @param onSelect - Callback when picking a option
 * @param isReset - Trigger to reset all
 * @param onReset - Callback when resetting
 */
export default <T extends string | ListType>({
  id,
  list,
  selectedIndex = () => 0,
  selectedIndexParent: selectedIndexSecondary = () => 0,
  onSelect,
  isReset,
  onReset,
}: ParentProps<Props<T>>) => {
  /// Target elements ///
  let selfButton: HTMLButtonElement | undefined;

  /// Signals ///
  const [isOpened, setIsOpened] = createSignal(false);
  const [selected, setSelected] = createSignal(selectedIndex());

  /// Post-processes ///
  onMount(() => {
    if (selfButton) selfButton.onclick = () => setIsOpened((v) => !v);
  });

  createEffect(() => {
    if (!isReset?.()) return;
    setSelected(0);
    onReset?.();
  });

  /// Functions ///
  const selectValue = (value: T, index: number) => {
    onSelect?.(index);
    setSelected(index);
    setIsOpened(false);
  };

  return (
    <div class="flex flex-col gap-1.5 relative">
      <button
        id={`picker_${id}`}
        ref={selfButton}
        class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe">
        <div class="flex gap-1.5">
          <span id={`current_${id}`} class="text-left">
            {typeof list === "function"
              ? isListType(list()[selectedIndex()]) // If list is Accessor
                ? (list()[selectedIndex()] as ListType).label
                : (list()[selectedIndex()] as string)
              : isListType(list[selectedIndex()]) // Else
                ? (list[selectedIndex()] as ListType).label
                : (list[selectedIndex()] as string)}
          </span>
        </div>
        <AngleDown size={20} />
      </button>
      <Show when={isOpened()}>
        <div
          id={`dropdown_${id}`}
          class="bg-mkw-700/75 border-mkw-650 shadow-mkw-850 shadow-2xl backdrop-blur-xs absolute top-[calc(.6em+100%)] w-full max-h-80 border rounded-lg z-1000 p-2.5 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
          <For each={typeof list === "function" ? list() : list}>
            {(v, i) => (
              <Switch>
                <Match when={isListType(v)}>
                  <button
                    class="hover:bg-mkw-650 border-transparent hover:border-mkw-550 hover:text-mkw-200 p-2.5 rounded-lg text-left border transition duration-250"
                    classList={{ "bg-mkw-650": selected() === i() }}
                    onClick={() => selectValue(v, i())}>
                    {(v as ListType).label}
                  </button>
                </Match>
                <Match when={!isListType(v)}>
                  <button
                    class="hover:bg-mkw-650 border-transparent hover:border-mkw-550 hover:text-mkw-200 p-2.5 rounded-lg text-left border transition duration-250"
                    classList={{ "bg-mkw-650": selected() === i() }}
                    onClick={() => selectValue(v, i())}>
                    {v as string}
                  </button>
                </Match>
              </Switch>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
