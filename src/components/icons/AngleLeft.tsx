export default function AngleLeft({ size, className }: { size: number; className?: string }) {
  return (
    <svg class={className} xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 320 512">
      <path
        fill="currentColor"
        d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
      />
    </svg>
  );
}
