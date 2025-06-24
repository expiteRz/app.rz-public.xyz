import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import Container from "~/components/Container";
import AngleLeft from "~/components/icons/AngleLeft";
import AngleRight from "~/components/icons/AngleRight";
import { Description, Title } from "~/components/SEO";
import { createLocalStorage } from "~/lib/LocalStorage";
import { Variants as AllVariantsHolder } from "./consts";

export default function KclFlagCalculator() {
	// Constraints
	const BaseTypes = Object.keys(AllVariantsHolder);
	const Variants = Object.values(AllVariantsHolder);

	// Local profile
	const [previousData, setPreviousData] = createLocalStorage("kclFlag_ZR", {
		baseType: 0x00,
		variant: 0x0,
		lightIndex: 0x0,
		depth: 0x0,
		effect: 0x0,
	});

	// Target elements
	let displayResult: HTMLDivElement | undefined;
	let displayVariant: HTMLDivElement | undefined;
	let dropdownBaseType: HTMLDivElement | undefined;
	let dropdownVariant: HTMLDivElement | undefined;
	let buttonBaseType: HTMLSpanElement | undefined;
	let buttonVariant: HTMLSpanElement | undefined;

	// Signals
	const [baseType, setBaseType] = createSignal(previousData.baseType);
	const [variant, setVariant] = createSignal(previousData.variant);
	const [lightIndex, setLightIndex] = createSignal(
		previousData.lightIndex >= 0 && previousData.lightIndex < 8 ? previousData.lightIndex : 0,
	);
	const [depth, setDepth] = createSignal(previousData.depth >= 0 && previousData.depth < 4 ? previousData.depth : 0);
	const [effect, setEffect] = createSignal(
		previousData.effect >= 0 && previousData.effect < 4 ? previousData.effect : 0,
	);
	const [isOpenedBaseType, setIsOpenedBaseType] = createSignal(false);
	const [isOpenedVariant, setIsOpenedVariant] = createSignal(false);

	// Post-processes
	onMount(() => init());
	createEffect(() => updateDisplay());

	// Functions
	const init = () => {
		document.body.className =
			"bg-gradient-to-b from-mkw-850 to-mkw-800 text-mkw-300 selection:bg-mkw-500/50 pt-[5em] font-(font-family:--default-font-family) transition duration-250";
		// displayResult = document.getElementById("disp_result");
		// displayVariant = document.getElementById("disp_variant");
		buttonBaseType
			? (buttonBaseType.innerHTML = `${
					BaseTypes[previousData.baseType]
				} (<span class="font-[Source_Code_Pro]">0x${previousData.baseType.toString(16).padStart(2, "0")}</span>)`)
			: {};
		buttonVariant!.innerHTML = `${
			Variants[baseType()][variant()].label
		} (<span class="font-[Source_Code_Pro]">0x${Variants[baseType()][variant()].exactId
			.toString(16)
			.padStart(2, "0")}</span>)`;
		document.addEventListener("mousedown", handleClickOutside);
		onCleanup(() => document.removeEventListener("mousedown", handleClickOutside));
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (buttonBaseType?.contains(event.target as Node) || buttonVariant?.contains(event.target as Node)) return;
		if (dropdownBaseType && !dropdownBaseType.contains(event.target as Node)) setIsOpenedBaseType(false);
		if (dropdownVariant && !dropdownVariant.contains(event.target as Node)) setIsOpenedVariant(false);
	};

	const updateDisplay = () => {
		displayResult
			? (displayResult.innerHTML = (
					baseType() |
					(variant() << 5) |
					(lightIndex() << 8) |
					(depth() << 11) |
					(effect() << 13)
				)
					.toString(16)
					.toUpperCase()
					.padStart(4, "0"))
			: {};
		displayVariant
			? (displayVariant.innerText = (variant() | (lightIndex() << 3) | (depth() << 6) | (effect() << 8))
					.toString(16)
					.toUpperCase()
					.padStart(3, "0"))
			: {};

		setPreviousData({
			baseType: baseType(),
			variant: variant(),
			lightIndex: lightIndex(),
			depth: depth(),
			effect: effect(),
		});
	};

	const selectBaseType = (index: number) => {
		buttonBaseType!.innerHTML = `${BaseTypes[index]} (<span class="font-[Source_Code_Pro]">0x${index
			.toString(16)
			.padStart(2, "0")}</span>)`;
		buttonVariant!.innerHTML = `${Variants[index][variant()].label} (<span class="font-[Source_Code_Pro]">0x${Variants[
			index
		][variant()].exactId
			.toString(16)
			.padStart(2, "0")}</span>)`;

		setIsOpenedBaseType(false);
		setBaseType(index);
	};

	const selectVariant = (index: number) => {
		buttonVariant!.innerHTML = `${Variants[baseType()][index].label} (<span class="font-[Source_Code_Pro]">0x${Variants[
			baseType()
		][index].exactId
			.toString(16)
			.padStart(2, "0")}</span>)`;
		setIsOpenedVariant(false);
		setVariant(index);
	};

	const updateLightIndex = (isAdd = false) => {
		isAdd
			? setLightIndex((prev) => (prev < 7 ? prev + 1 : prev))
			: setLightIndex((prev) => (prev > 0 ? prev - 1 : prev));
	};

	const updateDepth = (isAdd = false) => {
		isAdd ? setDepth((prev) => (prev < 3 ? prev + 1 : prev)) : setDepth((prev) => (prev > 0 ? prev - 1 : prev));
	};

	const updateEffect = (v: number) => {
		setEffect((prev) => prev ^ v);
	};

	const isEqualEffect = (v: number) => {
		return (effect() & v) !== 0 ? "bg-mkw-500/30 hover:bg-mkw-500/45 hover:text-mkw-250" : "hover:bg-mkw-500/30";
	};

	return (
		<>
			<Title>KCL Flag Calculator - Mario Kart Wii</Title>
			<Description>A literally simple KCL Flag Calculator for Custom Track creation</Description>
			<Container name="KCL Flag Calculator" version="RC2-pre" maxWidth="max-w-full md:max-w-xl" colors="mkw">
				<div class="grid md:auto-cols-[.33fr_.67fr] md:grid-flow-col gap-5">
					<div class="flex flex-col gap-4">
						<div class="flex flex-col gap-1.5">
							<strong>Result</strong>
							<div
								ref={displayResult}
								id="disp_result"
								class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border">
								0000
							</div>
						</div>
						<div class="flex flex-col gap-1.5">
							<strong>Variant only</strong>
							<div
								ref={displayVariant}
								id="disp_variant"
								class="bg-mkw-500/20 hover:bg-mkw-500/30 focus:bg-mkw-500/30 border-transparent hover:border-mkw-550 focus:border-mkw-550 transition duration-250 font-[Source_Code_Pro] p-2.5 rounded-lg border">
								000
							</div>
						</div>
					</div>
					<div class="bg-mkw-500/15 flex flex-col gap-4 p-4 rounded-lg">
						<div class="flex flex-col gap-1.5 relative">
							<strong>Base type</strong>
							<button
								id="btn_picklist_basetype"
								class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
								onClick={() => {
									setIsOpenedVariant((prev) => (prev ? false : prev));
									setIsOpenedBaseType((prev) => !prev);
								}}>
								<span ref={buttonBaseType} id="current_basetype" class="text-left">
									Road (<span class="font-[Source_Code_Pro]">0x00</span>)
								</span>
								<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
									<path
										fill="currentColor"
										d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
									/>
								</svg>
							</button>
							<Show when={isOpenedBaseType()}>
								<div
									ref={dropdownBaseType}
									class="bg-mkw-700/75 border-mkw-650 shadow-mkw-850 shadow-2xl backdrop-blur-xs absolute top-[calc(.6em_+_100%)] w-full max-h-80 border rounded-lg z-1000 p-2.5 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
									<For each={BaseTypes}>
										{(label, i) => (
											<button
												class="hover:bg-mkw-650 border-transparent hover:border-mkw-550 hover:text-mkw-200 p-2.5 rounded-lg text-left border transition duration-250"
												classList={{ "bg-mkw-650": baseType() === i() }}
												onClick={() => selectBaseType(i())}>
												{label}
											</button>
										)}
									</For>
								</div>
							</Show>
						</div>
						<div class="flex flex-col gap-1.5 relative">
							<strong>Variant</strong>
							<button
								id="btn_picklist_variant"
								class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
								onClick={() => {
									setIsOpenedBaseType((prev) => (prev ? false : prev));
									setIsOpenedVariant((prev) => !prev);
								}}>
								<span ref={buttonVariant} id="current_variant" class="text-left">
									Normal (<span class="font-[Source_Code_Pro]">0x0</span>)
								</span>
								<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
									<path
										fill="currentColor"
										d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
									/>
								</svg>
							</button>
							<Show when={isOpenedVariant()}>
								<div
									ref={dropdownVariant}
									class="bg-mkw-700/75 border-mkw-650 shadow-mkw-850 shadow-2xl backdrop-blur-xs absolute top-[calc(.6em_+_100%)] w-full max-h-80 border rounded-lg z-1000 p-2.5 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
									<For each={Variants[baseType()]}>
										{(v, i) => (
											<button
												class="hover:bg-mkw-650 border-transparent hover:border-mkw-550 hover:text-mkw-200 p-2.5 rounded-lg text-left border transition duration-250"
												classList={{ "bg-mkw-650": variant() === i() }}
												onClick={() => selectVariant(v.exactId)}>
												{v.label}
											</button>
										)}
									</For>
								</div>
							</Show>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div class="flex flex-col gap-1.5">
								<strong>Shadow</strong>
								<div class="bg-mkw-500/10 border-mkw-600 hover:border-mkw-500 grid grid-cols-3 border rounded-lg transition duration-250">
									<button
										class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer"
										onClick={() => updateLightIndex()}>
										<AngleLeft className="m-auto" size={20} />
									</button>
									<div class="p-2.5 text-center">{lightIndex()}</div>
									<button
										class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer"
										onClick={() => updateLightIndex(true)}>
										<AngleRight className="m-auto" size={20} />
									</button>
								</div>
							</div>
							<div class="flex flex-col gap-1.5">
								<strong>Depth</strong>
								<div class="bg-mkw-500/10 border-mkw-600 hover:border-mkw-500 grid grid-cols-3 border rounded-lg transition duration-250">
									<button
										class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer"
										onClick={() => updateDepth()}>
										<AngleLeft className="m-auto" size={20} />
									</button>
									<div class="p-2.5 text-center">{depth()}</div>
									<button
										class="hover:bg-mkw-500/30 transition duration-250 cursor-pointer"
										onClick={() => updateDepth(true)}>
										<AngleRight className="m-auto" size={20} />
									</button>
								</div>
							</div>
						</div>
						<div class="flex flex-col gap-1.5">
							<strong>Effects</strong>
							<div class="bg-mkw-500/10 border-mkw-600 hover:border-mkw-500 grid grid-cols-3 border rounded-lg transition duration-250">
								<button
									class={`${isEqualEffect(0b001)} transition duration-250 cursor-pointer p-2.5 text-center`}
									onClick={() => updateEffect(0b001)}>
									Trickable
								</button>
								<button
									class={`${isEqualEffect(0b010)} transition duration-250 cursor-pointer p-2.5 text-center`}
									onClick={() => updateEffect(0b010)}>
									Reject
								</button>
								<button
									class={`${isEqualEffect(0b100)} transition duration-250 cursor-pointer p-2.5 text-center`}
									onClick={() => updateEffect(0b100)}>
									Wall
								</button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
