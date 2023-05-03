import { useContext, useEffect, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";
import DockIcon from "./Icon";

export const DockLauncher = () => {
  const { openedWindows } = useContext(WindowsContext);
  const [activeFileTypes, setActiveFileTypes] = useState<[string, number][]>([
    ["folder", 0],
  ]);

  useEffect(() => {
    const activeFileTypesMap = new Map<string, number>();
    activeFileTypesMap.set("folder", 0);
    openedWindows.forEach((window) => {
      activeFileTypesMap.set(
        window.fileType,
        (activeFileTypesMap.get(window.fileType) ?? 0) + 1
      );
    });
    const newArray = Array.from(activeFileTypesMap);
    setActiveFileTypes(newArray);
  }, [openedWindows]);

  return (
    <div className="flex flex-col bg-dark-navy bg-opacity-50 justify-start h-full sp-1 shrink-0">
      <div className="flex flex-col gap-2 relative h-full overflow-visible">
        {activeFileTypes?.map((array) => (
          <DockIcon key={array[0]} fileType={array[0]} count={array[1]} />
        ))}
      </div>
    </div>
  );
};
