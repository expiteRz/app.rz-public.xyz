export default function Exclamation({ size, className }: { size: number; className?: string }) {
  return (
    <svg class={className} xmlns="http://www.w3.org/2000/svg" viewBox="-192 0 512 512" width={size}>
      <path
        fill="currentColor"
        d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64v256c0 17.7 14.3 32 32 32s32-14.3 32-32zM64 480a40 40 0 1 0 0-80a40 40 0 1 0 0 80"></path>
    </svg>
  );
}
