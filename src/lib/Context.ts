import { createContext } from "solid-js";

const CustomAlertAccessor = {
  setAlert: () => {},
};

export const CustomAlert = createContext({
  message: "",
  is_updated: false,
});
