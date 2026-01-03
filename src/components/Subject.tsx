import Chip from "./Chip";

export default ({ name, version, indev, color }: { name: string; version: string; indev?: boolean; color?: "zr" | "mkw" }) => (
  <div class="flex flex-row items-center flex-1">
    <h1 class="text-2xl font-bold">{name}</h1>
    <Chip indev={indev} color={color}>
      {version}
    </Chip>
  </div>
);
