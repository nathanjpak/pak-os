import { useState } from "react";
import { Desktop } from "./components/Desktop";
import { DockLauncher } from "./components/DockLauncher";
import { Header } from "./components/Header";
import WindowsContext from "./contexts/windowsContext";

export interface IWindow {
  fileName: string;
  focused: boolean;
}

export const App = () => {
  const [openedWindows, setOpenedWindows] = useState<Map<string, IWindow>>(
    new Map<string, IWindow>()
  );

  const addOpenedWindow = (fileName: string) => {
    if (!openedWindows.has(fileName)) {
      const newMap = new Map(openedWindows);
      newMap.forEach((window) => (window.focused = false));
      newMap.set(fileName, { fileName: fileName, focused: true });
      setOpenedWindows(newMap);
    }
  };

  const removeOpenedWindow = (fileName: string) => {
    const newMap = new Map(openedWindows);
    newMap.delete(fileName);
    setOpenedWindows(newMap);
  };

  return (
    <div className="flex flex-col bg-green-100 w-screen h-screen bg-default-static bg-cover bg-bottom lg:bg-auto lg:bg-repeat-x">
      <WindowsContext.Provider
        value={{
          openedWindows,
          setOpenedWindows,
          addOpenedWindow,
          removeOpenedWindow,
        }}
      >
        <Header />
        <div className="grow flex">
          <DockLauncher />
          <Desktop />
        </div>
      </WindowsContext.Provider>
    </div>
  );
};
