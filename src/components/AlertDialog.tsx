import { createSignal, onMount } from "solid-js";

export default function AlertDialog({ error, onClose }: { error: Error; onClose: () => void }) {
  const [visible, setVisible] = createSignal(false);
  onMount(() => {
    const t = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
      setTimeout(onClose, 500);
    }, 200);
    return () => clearTimeout(t);
  });

  const parentOnClose = () => {
    setVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div
      class="p-10 bg-amber-500"
      classList={{ "-top-full": !visible(), "opacity-0": !visible(), "top-full": visible(), "opacity-100": visible() }}>
      {error.message}
    </div>
  );
}
