import { For, Show } from "solid-js";
import Container from "~/components/Container";
import NumericInput from "~/components/NumericInput";
import { createLocalStorage } from "~/lib/LocalStorage";

export default function Counter() {
  /// Signals ///
  const [count, setCounter] = createLocalStorage<{ counters: { name: string; count: number }[] }>("just_a_counter", { counters: [] });

  /// Functions ///
  const addNewCounter = () => {
    setCounter("counters", (current) => [...current, { name: "counter", count: 0 }]);
  };

  /// Components ///
  const NewScreen = () => (
    <div class="flex flex-col max-w-sm w-full mx-auto gap-4">
      <span class="mx-auto">
        Click <code class="border-zr-400/30 p-1 border rounded-lg">New counter</code> to add a counter
      </span>
      <button
        class="bg-zr-500/10 hover:bg-zr-500/20 border-zr-600 hover:border-zr-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
        onClick={addNewCounter}>
        New counter
      </button>
    </div>
  );

  const RibbonButtons = () => (
    <Show when={count.counters.length > 0}>
      <div class="flex flex-row gap-4">
        <button
          class="bg-zr-500/10 hover:bg-zr-500/20 border-zr-600 hover:border-zr-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
          onClick={addNewCounter}>
          Add
        </button>
      </div>
    </Show>
  );

  return (
    <Container
      name="Just a Counter"
      version="1.0-test"
      indev={true}
      description="Just a numeric counter"
      maxWidth="max-w-full xs:max-w-xl"
      ribbon={<RibbonButtons />}>
      <Show when={count.counters.length > 0} fallback={<NewScreen />}>
        <div class="flex flex-col gap-1">
          <For each={count.counters}>
            {({ name, count }, index) => (
              <div class="hover:bg-zr-650/30 flex flex-col gap-1 p-3 rounded-lg transition duration-250">
                <div class="flex flex-row gap-2 p-1">
                  <input
                    class="w-full"
                    value={name}
                    onBlur={(ev) => setCounter("counters", index(), (current) => ({ name: ev.target.value, count: current.count }))}></input>
                  <button
                    class="hover:bg-zr-600/50 active:bg-zr-800/40 p-2 rounded-md transition duration-250"
                    onClick={() => setCounter("counters", (items) => items.filter((_, i) => i !== index()))}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12} height={12}>
                      <path
                        fill="currentColor"
                        d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"
                      />
                    </svg>
                  </button>
                </div>
                <NumericInput
                  id={`counter_${index()}_${name}`}
                  min={0}
                  max={Number.MAX_SAFE_INTEGER}
                  defaultValue={count}
                  onChange={(i) => setCounter("counters", index(), (current) => ({ name: current.name, count: i }))}
                />
              </div>
            )}
          </For>
        </div>
      </Show>
    </Container>
  );
}
