import { useState } from "react";
import { Desktop } from "./components/Desktop";
import { DockLauncher } from "./components/DockLauncher";
import { Header } from "./components/Header";
import WindowsContext from "./contexts/windowsContext";

export const App = () => {
  const [openedWindows, setOpenedWindows] = useState<string[]>([]);

  const addOpenedWindow = (fileName: string) => {
    if (!openedWindows.includes(fileName)) {
      const newArray = [...openedWindows];
      newArray.push(fileName);
      setOpenedWindows(newArray);
    }
  };

  const removeOpenedWindow = (id: string) => {
    const newArray = openedWindows.filter((val) => val !== id);
    setOpenedWindows(newArray);
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
