import { SetStateAction, createContext } from "react";

interface IWindowsContext {
  openedWindows: string[];
  setOpenedWindows: React.Dispatch<SetStateAction<any>>;
  addOpenedWindow: (fileName: string) => void;
  removeOpenedWindow: (fileName: string) => void;
}

const WindowsContext = createContext<IWindowsContext>({
  openedWindows: [],
  setOpenedWindows: () => {},
  addOpenedWindow: () => {},
  removeOpenedWindow: () => {},
});

export default WindowsContext;
