import { A, useLocation } from "@solidjs/router";
import { For, onMount, Show } from "solid-js";
import { AppList } from "~/app";
import Warning from "~/components/icons/Warning";

export default function Home() {
  const location = useLocation();
  onMount(() => {
    document.body.className =
      "bg-gradient-to-b from-zr-850 to-index-bg bg-zr-850 text-zr-300 selection:bg-zr-500/50 pt-[5em] font-(font-family:--default-font-family) transition duration-250";
  });

  return (
    <div class="flex flex-col gap-12">
      <h1 class="text-zr-250 font-[Poppins] text-4xl sm:text-5xl md:text-6xl font-bold mx-auto text-nowrap">
        <span class="text-index-point text-shadow-index-point text-shadow-[0_0_1.8em_var(--color-index-point)] font-extrabold">app.</span>
        {"rz-public.xyz"}
      </h1>
      <div class="mx-auto p-4 max-w-md w-full flex flex-col gap-4">
        <For each={AppList}>
          {(v) =>
            v.type === "redirect" ? (
              <a
                class="transition duration-250 bg-zr-500/20 hover:bg-zr-500/30 text-zr-300 hover:text-zr-250 border-zr-700 hover:border-zr-650 p-4 border rounded-lg flex flex-row"
                href={v.url}
                target="_blank">
                <span>{v.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={20} class="ml-auto mr-0 my-auto">
                  <path
                    fill="currentColor"
                    d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z"
                  />
                </svg>
              </a>
            ) : (
              <A
                class="transition duration-250 bg-zr-500/20 hover:bg-zr-500/30 text-zr-300 hover:text-zr-250 border-zr-700 hover:border-zr-650 p-4 border rounded-lg flex flex-row"
                href={v.url}
                state={{ previous: location.pathname, category: v.category }}
                title={v.indev ? "This app is currently experimental" : ""}>
                <span>{v.name}</span>
                <Show when={v.indev}>
                  <Warning size={20} className="ml-auto mr-0 my-auto fill-amber-300/60" desc="This application is still work-in-progress" />
                </Show>
              </A>
            )
          }
        </For>
      </div>
    </div>
  );
}
