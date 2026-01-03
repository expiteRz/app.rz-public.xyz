import { catchError, createSignal, Match, onMount, Show, Switch } from "solid-js";
import Container from "~/components/Container";
import AngleLeft from "~/components/icons/AngleLeft";
import AngleRight from "~/components/icons/AngleRight";
import PreparingScreen from "~/components/PreparingScreen";
import { BinaryReader } from "~/lib/Binary";
import { SolidityMethods, SoliditySettingLabels } from "./consts";

type ObjectConstructor = {
  id: number;
  name: string;
  resource: string;
  sound: number;
  clipping: number;
  backDrawDistance: number;
  forwardDrawDistance: number;
  solidity: number;
  soliditySetting1: number;
  soliditySetting3: number;
  soliditySetting2: number;
};

export default function ObjFlowBinEditor() {
  /// Target elements ///
  let inputFile: HTMLInputElement | undefined;
  let spanNameElement: HTMLSpanElement | undefined;
  let spanResourceElement: HTMLSpanElement | undefined;
  let divSoundElement: HTMLDivElement | undefined;
  let spanSelectedMethodElement: HTMLSpanElement | undefined;
  let spanSelectedSolidityElement: HTMLSpanElement | undefined;
  let strongSolidity1LabelElement: HTMLElement | undefined;
  let strongSolidity2LabelElement: HTMLElement | undefined;
  let strongSolidity3LabelElement: HTMLElement | undefined;

  /// Signals ///
  const [data, setData] = createSignal<ObjectConstructor[]>([]);
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  /// Post-processes ///
  onMount(() => {
    document.body.className =
      "bg-gradient-to-b from-mkw-850 to-mkw-800 text-mkw-300 selection:bg-mkw-500/50 pt-[5em] font-(font-family:--default-font-family) transition duration-250";

    inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.multiple = false;
    inputFile.accept = ".bin";
    inputFile.onchange = processLoadedBinary;
  });

  /// Functions ///
  const openFile = (_: Event) => inputFile?.click();
  const processLoadedBinary = async (event: Event) => {
    let objects: ObjectConstructor[] = [];
    try {
      const t = event.target as HTMLInputElement | null;
      if (!t?.files?.length || t.files[0].size !== 0x951a) throw new Error("No file selected or unexpected binary file loaded");

      const data = await t.files[0].bytes();
      const reader = new BinaryReader(data);
      const objLength = reader.readUInt16();
      if (objLength !== 0x13c) throw new Error("Unexpected binary file loaded > " + t.files[0].name);

      for (let i = 0; i < objLength; i++) {
        const id = reader.readUInt16();
        const name = reader.readAscii(0x20);
        const resource = reader.readAscii(0x40);
        const sound = reader.readUInt16();
        const clipping = reader.readInt16();
        const backDrawDistance = reader.readInt16();
        const forwardDrawDistance = reader.readInt16();
        const solidity = reader.readUInt16();
        const soliditySetting1 = reader.readInt16();
        const soliditySetting2 = reader.readInt16();
        const soliditySetting3 = reader.readInt16();
        reader.readInt16(); // padding

        objects.push({
          id,
          name,
          resource,
          sound,
          clipping,
          backDrawDistance,
          forwardDrawDistance,
          solidity,
          soliditySetting1,
          soliditySetting2,
          soliditySetting3,
        });
      }
      console.log(objects);
      setData(objects);
    } catch (e) {
      alert(e);
      // throw e;
    }
  };

  // const PreparingScreen = () => (
  //   <div class="flex flex-col max-w-sm w-full mx-auto gap-4">
  //     <h3 class="mx-auto">
  //       Select{" "}
  //       <code class="bg-mkw-800 text-mkw-400 border-mkw-700 selection:text-mkw-300 p-1 border rounded-md">
  //         ObjFlow.bin
  //       </code>{" "}
  //       file to continue
  //     </h3>
  //     <button
  //       class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
  //       onClick={openFile}>
  //       Open file
  //     </button>
  //   </div>
  // );

  const RibbonButtons = () => (
    <Show when={data().length > 0}>
      <div class="flex flex-row gap-4">
        <button
          class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
          onClick={openFile}>
          Open
        </button>
        <button class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe">
          Save
        </button>
      </div>
    </Show>
  );

  return (
    <Container name="ObjFlow.bin Editor" version="pre-1.0" indev maxWidth="max-w-2xl" colors="mkw" ribbon={RibbonButtons()}>
      <Show when={data().length > 0} fallback={<PreparingScreen fileName="ObjFlow.bin" openFileHandler={openFile} />}>
        <div class="grid auto-cols-[.5fr_.5fr] grid-flow-col gap-5">
          <div class="bg-mkw-500/10 border-mkw-500/20 hover:border-mkw-500/70 max-h-120 rounded-lg border overflow-x-hidden overflow-y-auto scrollbar-thin transition duration-250">
            <span>test</span>
          </div>
          <div class="bg-mkw-500/15 flex flex-col gap-4 p-4 rounded-lg">
            <div class="flex flex-col gap-1.5 relative">
              <strong>Name</strong>
              <div
                class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden cursor-not-allowed"
                title="This field cannot be edited">
                <span ref={spanNameElement}>Untitled</span>
              </div>
            </div>
            <div class="flex flex-col gap-1.5 relative">
              <strong>Resource name</strong>
              <div
                class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden cursor-not-allowed"
                title="This field cannot be edited">
                <span ref={spanResourceElement}>Untitled</span>
              </div>
            </div>
            <div class="flex flex-col gap-1.5 relative">
              <strong>Sound related</strong>
              <div class="bg-mkw-500/10 border-mkw-600 hover:border-mkw-500 grid grid-cols-3 border rounded-lg transition duration-250">
                <button class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer p-2.5 text-center">1</button>
                <button class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer p-2.5 text-center">2</button>
                <button class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer p-2.5 text-center">3</button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5 relative">
              <strong>Clipping Method</strong>
              <button class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe">
                <span ref={spanSelectedMethodElement} class="text-left">
                  None
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-col gap-1.5 relative">
              <strong>Solidity</strong>
              <button class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe">
                <span ref={spanSelectedSolidityElement} class="text-left">
                  {SolidityMethods[3].label}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                  />
                </svg>
              </button>
            </div>
            <Switch>
              <Match when={SolidityMethods[3].visibilitySettings === 3}>
                <div class="flex flex-row gap-3 relative">
                  <strong ref={strongSolidity1LabelElement} class="my-auto">
                    {SoliditySettingLabels[3].setting1}
                  </strong>
                  <input
                    type="number"
                    class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 max-w-50 w-max transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden ml-auto mr-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style="-moz-appearance: textfield"
                    size={16}
                    min={-32768}
                    max={32767}
                    value={0}
                  />
                </div>
                <div class="flex flex-row gap-3 relative">
                  <strong ref={strongSolidity2LabelElement} class="my-auto">
                    {SoliditySettingLabels[3].setting2}
                  </strong>
                  <input
                    type="number"
                    class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 max-w-50 w-max transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden ml-auto mr-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style="-moz-appearance: textfield"
                    size={16}
                    min={-32768}
                    max={32767}
                    value={0}
                  />
                </div>
                <div class="flex flex-row gap-3 relative">
                  <strong ref={strongSolidity3LabelElement} class="my-auto">
                    {SoliditySettingLabels[3].setting3}
                  </strong>
                  <input
                    type="number"
                    class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 max-w-50 w-max transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border relative overflow-hidden ml-auto mr-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style="-moz-appearance: textfield"
                    size={16}
                    min={-32768}
                    max={32767}
                    value={0}
                  />
                </div>
              </Match>
            </Switch>
          </div>
        </div>
      </Show>
    </Container>
  );
}
