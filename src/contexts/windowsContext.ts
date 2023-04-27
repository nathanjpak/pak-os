import { SetStateAction, createContext } from "react";
import { IWindow } from "../App";

interface IWindowsContext {
  openedWindows: Map<string, IWindow>;
  focusWindow: string | null;
  setOpenedWindows: React.Dispatch<SetStateAction<any>>;
  addOpenedWindow: (fileName: string, path?: string[]) => void;
  removeOpenedWindow: (fileName: string) => void;
  updateWindowPath: (fileName: string, path?: string[]) => void;
  updateWindowHistory: (fileName: string, isGoingForward: boolean) => void;
  setFocusWindow: React.Dispatch<SetStateAction<string | null>>;
}

const WindowsContext = createContext<IWindowsContext>({
  openedWindows: new Map(),
  focusWindow: null,
  setOpenedWindows: () => {},
  addOpenedWindow: () => {},
  removeOpenedWindow: () => {},
  updateWindowPath: () => {},
  updateWindowHistory: () => {},
  setFocusWindow: () => {},
});

export default WindowsContext;
