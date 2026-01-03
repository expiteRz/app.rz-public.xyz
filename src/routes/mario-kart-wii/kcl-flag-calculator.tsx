import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import Container from "~/components/Container";
import MultiPicker from "~/components/MultiPicker";
import NumericInput from "~/components/NumericInput";
import Picklist from "~/components/Picklist";
import ValueDisplay from "~/components/ValueDisplay";
import { CopyToClipboard } from "~/lib/Clipboard";
import { createLocalStorage } from "~/lib/LocalStorage";
import { AllVariants } from "./consts";

export default function KclFlagCalculator() {
  /// Constraints ///
  const BaseTypes = Object.keys(AllVariants);
  const Variants = Object.values(AllVariants);

  /// Local profile ///
  const [previousData, setPreviousData] = createLocalStorage("kclFlag_ZR", {
    baseType: 0x00,
    variant: 0x0,
    lightIndex: 0x0,
    depth: 0x0,
    effect: 0x0,
  });

  /// Target elements ///
  let buttonBaseType: HTMLButtonElement | undefined;
  let buttonVariant: HTMLButtonElement | undefined;
  let hexButtonBaseType: HTMLSpanElement | undefined;
  let hexButtonVariant: HTMLSpanElement | undefined;

  /// Signals ///
  const [selectedBaseType, setSelectedBaseType] = createSignal(previousData.baseType > 0x1f || previousData.baseType < 0 ? 0 : previousData.baseType);
  const [selectedVariant, setSelectedVariant] = createSignal(previousData.variant > 7 || previousData.variant < 0 ? 0 : previousData.variant);
  const [lightIndex, setLightIndex] = createSignal(previousData.lightIndex >= 0 && previousData.lightIndex < 8 ? previousData.lightIndex : 0);
  const [depth, setDepth] = createSignal(previousData.depth >= 0 && previousData.depth < 4 ? previousData.depth : 0);
  const [effect, setEffect] = createSignal(previousData.effect >= 0 && previousData.effect < 8 ? previousData.effect : 0);
  const [triggerReset, setTriggerReset] = createSignal(false);
  const [variants, setVariants] = createSignal<{ exactId: number; label: string; description?: string }[]>(Variants[selectedBaseType()]);
  // Picker related
  // const [isOpenedBaseType, setIsOpenedBaseType] = createSignal(false);
  // const [isOpenedVariant, setIsOpenedVariant] = createSignal(false);

  /// Post-processes ///
  onMount(() => init());
  createEffect(() => updateDisplay());

  /// Functions ///
  const init = () => {
    setVariants(Variants[selectedBaseType()]);
    document.body.className =
      "bg-gradient-to-b from-mkw-850 to-mkw-800 text-mkw-300 selection:bg-mkw-500/50 pt-[5em] font-(font-family:--default-font-family) transition duration-250";

    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => document.removeEventListener("mousedown", handleClickOutside));
  };

  const calculateResult = () =>
    (selectedBaseType() | (selectedVariant() << 5) | (lightIndex() << 8) | (depth() << 11) | (effect() << 13))
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();

  const calculateVariant = () =>
    (selectedVariant() | (lightIndex() << 3) | (depth() << 6) | (effect() << 8)).toString(16).padStart(3, "0").toUpperCase();

  const calculateBits = () =>
    (selectedBaseType() | (selectedVariant() << 5) | (lightIndex() << 8) | (depth() << 11) | (effect() << 13))
      .toString(2)
      .padStart(16, "0")
      .toUpperCase();

  const setTextToTarget = (
    target: HTMLSpanElement | undefined,
    value: string | number,
    padding: number = 1,
    format: "hex" | "bit" | "none" = "hex",
  ) => {
    if (typeof value === "number") {
      switch (format) {
        case "none":
          target!.innerText = value.toString(16).toUpperCase().padStart(padding, "0");
          break;
        case "bit":
          target!.innerText = value.toString(2).toUpperCase().padStart(padding, "0");
          break;
        default:
          target!.innerText = `0x${value.toString(16).toUpperCase().padStart(padding, "0")}`;
          break;
      }
    } else {
      target!.innerText = value;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonBaseType?.contains(event.target as Node) || buttonVariant?.contains(event.target as Node)) return;
    // if (dropdownBaseType && !dropdownBaseType.contains(event.target as Node)) setIsOpenedBaseType(false);
    // if (dropdownVariant && !dropdownVariant.contains(event.target as Node)) setIsOpenedVariant(false);
  };

  const updateDisplay = () => {
    // setTextToTarget(displayResult, baseType() | (variant() << 5) | (lightIndex() << 8) | (depth() << 11) | (effect() << 13), 4, "none");
    // setTextToTarget(displayVariant, variant() | (lightIndex() << 3) | (depth() << 6) | (effect() << 8), 3, "none");
    // setTextToTarget(displayBits, baseType() | (variant() << 5) | (lightIndex() << 8) | (depth() << 11) | (effect() << 13), 16, "bit");

    // setTextToTarget(labelButtonBaseType, BaseTypes[baseType()]);
    setTextToTarget(hexButtonBaseType, selectedBaseType(), 2);
    // setTextToTarget(labelButtonVariant, Variants[selectedBaseType()][selectedVariant()].label);
    setTextToTarget(hexButtonVariant, Variants[selectedBaseType()][selectedVariant()].exactId, 1);

    setPreviousData({
      baseType: selectedBaseType(),
      variant: selectedVariant(),
      lightIndex: lightIndex(),
      depth: depth(),
      effect: effect(),
    });
  };

  const selectBaseType = (index: number) => {
    // setIsOpenedBaseType(false);
    setSelectedBaseType(index);
    setVariants(Variants[index]);
  };

  const selectVariant = (index: number) => {
    // setIsOpenedVariant(false);
    setSelectedVariant(index);
  };

  const updateEffect = (v: number) => {
    setEffect((prev) => prev ^ (1 << v));
  };

  const resetValue = () => {
    setTriggerReset(true);
    setSelectedBaseType(0);
    setSelectedVariant(0);
    setVariants(Variants[0]);
    setLightIndex(0);
    setDepth(0);
    setEffect(0);
    setTriggerReset(false);
  };

  return (
    <Container
      name="KCL Flag Calculator"
      version="RC3"
      description="A literally simple KCL Flag Calculator for Custom Track creation"
      maxWidth="max-w-full xs:max-w-xl"
      colors="mkw">
      <div class="grid sm:auto-cols-[.33fr_.67fr] sm:grid-flow-col gap-6 sm:gap-5">
        <div class="flex flex-col gap-4">
          <ValueDisplay id="disp_basetype" label="Result" value={calculateResult()} onCopyToClipboard={() => CopyToClipboard(calculateResult())} />
          <ValueDisplay
            id="disp_variant"
            label="Variant only"
            value={calculateVariant()}
            onCopyToClipboard={() => CopyToClipboard(calculateVariant())}
          />
          <ValueDisplay id="disp_bits" class="sm:text-sm" label="Bits*" value={calculateBits()} />
          <button
            class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer"
            onClick={resetValue}>
            Reset
          </button>
        </div>
        <div class="bg-mkw-500/15 flex flex-col gap-4 p-4 rounded-lg">
          <div class="flex flex-col gap-1.5 relative">
            <div class="flex">
              <strong>Base type</strong>
              <span
                ref={hexButtonBaseType}
                id="current_basetype_hex"
                class="outline-mkw-500 font-[Source_Code_Pro] outline-1 rounded-full text-sm px-1.5 py-0.5 ml-auto"
              />
            </div>
            <Picklist
              id="test_picker_basetype"
              list={BaseTypes}
              selectedIndex={selectedBaseType}
              onSelect={(i) => selectBaseType(i)}
              isReset={triggerReset}
            />
          </div>
          <div class="flex flex-col gap-1.5 relative">
            <div class="flex">
              <strong>Variant</strong>
              <span
                ref={hexButtonVariant}
                id="current_variant_hex"
                class="outline-mkw-500 font-[Source_Code_Pro] outline-1 rounded-full text-sm px-1.5 py-0.5 ml-auto"
              />
            </div>
            <Picklist id="variants" list={variants} selectedIndex={selectedVariant} onSelect={(i) => selectVariant(i)} isReset={triggerReset} />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <strong>Light set</strong>
              <NumericInput id="lightset" min={0} max={7} defaultValue={lightIndex()} onChange={(i) => setLightIndex(i)} isReset={triggerReset} />
            </div>
            <div class="flex flex-col gap-1.5">
              <strong>Depth</strong>
              <NumericInput id="depth" min={0} max={3} defaultValue={depth()} onChange={(i) => setDepth(i)} isReset={triggerReset} />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <strong>Effects</strong>
            <MultiPicker
              id="effect"
              options={["Trickable", "Reject", "Wall"]}
              defaultValue={effect()}
              onChange={(i) => updateEffect(i)}
              isReset={triggerReset}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
