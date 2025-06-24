import Chip from "./Chip";

export default ({ name, version }: { name: string; version: string }) => (
  <div class="flex flex-row items-center">
    <h1 class="text-2xl font-bold">{name}</h1>
    <Chip>{version}</Chip>
  </div>
);
