export default function PreparingScreen({
  fileName,
  openFileHandler,
}: {
  fileName: string;
  openFileHandler: (event: Event) => void;
}) {
  return (
    <div class="flex flex-col max-w-sm w-full mx-auto gap-4">
      <h3 class="mx-auto">
        {"Open "}
        <code class="bg-mkw-800 text-mkw-400 border-mkw-700 selection:text-mkw-300 p-1 border rounded-md">
          {fileName}
        </code>{" "}
        file to continue
      </h3>
      <button
        class="bg-mkw-500/10 hover:bg-mkw-500/20 border-mkw-600 hover:border-mkw-500 transition duration-250 p-2.5 rounded-lg border grid auto-cols-[1fr_auto] grid-flow-col cursor-pointer items-center-safe"
        onClick={openFileHandler}>
        Open file
      </button>
    </div>
  );
}
