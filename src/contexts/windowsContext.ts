import { SetStateAction, createContext } from "react";
import { IWindow } from "../App";

interface IWindowsContext {
  openedWindows: Map<string, IWindow>;
  setOpenedWindows: React.Dispatch<SetStateAction<any>>;
  addOpenedWindow: (fileName: string) => void;
  removeOpenedWindow: (fileName: string) => void;
}

const WindowsContext = createContext<IWindowsContext>({
  openedWindows: new Map(),
  setOpenedWindows: () => {},
  addOpenedWindow: () => {},
  removeOpenedWindow: () => {},
});

export default WindowsContext;
