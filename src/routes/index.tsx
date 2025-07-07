import { A, useLocation } from "@solidjs/router";
import { For, onMount } from "solid-js";
import { AppList } from "~/app";

export default function Home() {
  const location = useLocation();
  onMount(() => {
    document.body.className =
      "bg-gradient-to-b from-zr-850 to-index-bg bg-zr-850 text-zr-300 selection:bg-zr-500/50 pt-[5em] font-(font-family:--default-font-family) transition duration-250";
  });

  return (
    <div class="flex flex-col gap-12">
      <h1 class="text-zr-250 font-[Poppins] text-4xl sm:text-5xl md:text-6xl font-bold mx-auto text-nowrap">
        <span class="text-index-point text-shadow-index-point text-shadow-[0_0_1.8em_var(--color-index-point)] font-extrabold">
          app.
        </span>
        {"rz-public.xyz"}
      </h1>
      <div class="mx-auto p-4 max-w-md w-full flex flex-col gap-4">
        <For each={AppList}>
          {(v) => (
            <A
              class="transition duration-250 bg-zr-500/20 hover:bg-zr-500/30 text-zr-300 hover:text-zr-250 border-zr-700 hover:border-zr-650 p-4 border rounded-md"
              href={v.path}
              state={{ previous: location.pathname }}>
              {v.name}
            </A>
          )}
        </For>
      </div>
    </div>
  );
}
