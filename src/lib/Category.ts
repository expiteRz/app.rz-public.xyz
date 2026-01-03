import { useLocation } from "@solidjs/router";

export function getCurrentCategory() {
  const location = useLocation<{ category: "mkw" | "fp" }>();
  if (location.state?.category) {
    return location.state?.category;
  } else {
    const split_paths = location.pathname.split("/").splice(1);
    const first_path = split_paths.length > 0 ? split_paths[0] : "";
    switch (first_path) {
      case "mario-kart-wii":
        return "mkw";
      case "faaast-penguin":
        return "fp";
      default:
        return null;
    }
  }
}
