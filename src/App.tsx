import { useState } from "react";
import { Desktop } from "./components/Desktop";
import { DockLauncher } from "./components/DockLauncher";
import { Header } from "./components/Header";
import WindowsContext from "./contexts/windowsContext";

export interface IWindow {
  fileName: string;
  nameString: string;
  fileType: string;
  path: string[];
  history: string[][];
  future: string[][];
}

export const App = () => {
  const [openedWindows, setOpenedWindows] = useState<Map<string, IWindow>>(
    new Map<string, IWindow>()
  );

  const [focusWindow, setFocusWindow] = useState<string | null>(null);

  const addOpenedWindow = (fileName: string, path: string[] = []) => {
    if (!openedWindows.has(fileName)) {
      const newMap = new Map(openedWindows);
      let [nameString, fileType] = fileName.split(".");
      if (!fileType) fileType = "folder";
      newMap.set(fileName, {
        fileName,
        nameString,
        fileType,
        path: [...path, fileName],
        history: [],
        future: [],
      });
      setOpenedWindows(newMap);
    }
    setFocusWindow(fileName);
  };

  const updateWindowPath = (fileName: string, path: string[] = []) => {
    const newMap = new Map(openedWindows);
    const currentWindow = newMap.get(fileName);

    if (currentWindow) {
      const updatedWindow: IWindow = {
        ...currentWindow,
        nameString: path[path.length - 1],
        path: path,
        history: [...currentWindow.history, currentWindow.path],
      };
      newMap.set(fileName, updatedWindow);
    }

    setOpenedWindows(newMap);
  };

  const updateWindowHistory = (fileName: string, isGoingForward: boolean) => {
    const newMap = new Map(openedWindows);
    const currentWindow = newMap.get(fileName);

    if (currentWindow) {
      const destination = isGoingForward
        ? currentWindow.future.pop()
        : currentWindow.history.pop();

      currentWindow.nameString = destination![destination!.length - 1];
      if (isGoingForward) {
        currentWindow.history = [...currentWindow.history, currentWindow.path];
      } else {
        currentWindow.future = [...currentWindow.future, currentWindow.path];
      }
      currentWindow.path = destination!;
      console.log("destination", destination);
      console.log("history", currentWindow.history);
      console.log("future", currentWindow.future);
      console.log("current", currentWindow.path);
      console.log("fileName", currentWindow.fileName);
      console.log("nameString", currentWindow.nameString);
      console.log("updatedWindow", currentWindow);
    }

    setOpenedWindows(newMap);
  };

  const removeOpenedWindow = (fileName: string) => {
    const newMap = new Map(openedWindows);
    newMap.delete(fileName);
    setOpenedWindows(newMap);
    if (focusWindow === fileName) setFocusWindow(null);
  };

  return (
    <div className="flex flex-col bg-green-100 w-screen h-screen bg-default-static bg-cover bg-bottom lg:bg-auto lg:bg-repeat-x">
      <WindowsContext.Provider
        value={{
          openedWindows,
          focusWindow,
          setOpenedWindows,
          addOpenedWindow,
          removeOpenedWindow,
          updateWindowPath,
          updateWindowHistory,
          setFocusWindow,
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
