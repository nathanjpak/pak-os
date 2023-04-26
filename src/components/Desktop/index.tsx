import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { DesktopIcon } from "./Icon";
import { useContext, useEffect, useRef, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";
import { Window } from "./Window";
import DesktopSizeContext from "../../contexts/desktopSizeContext";
import fileSystemContext from "../../contexts/fileSystemContext";

import Files from "../../files";

export const Desktop = () => {
  const { openedWindows, focusWindow, setFocusWindow } =
    useContext(WindowsContext);

  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const onResize = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
  }, []);

  const handleClick = () => {
    if (focusWindow) setFocusWindow(null);
  };

  return (
    <div
      ref={ref}
      className="grid gap-0.5 grow grid-flow-col"
      style={{
        gridTemplateColumns: `repeat(auto-fill, 120px)`,
        gridTemplateRows: `repeat(auto-fill, 120px)`,
      }}
      onClick={handleClick}
    >
      <DesktopSizeContext.Provider value={size}>
        {Object.keys(Files).map((file) => {
          const isFolder = !file.includes(".");
          return (
            <DesktopIcon
              key={file}
              fileName={file}
              svg={isFolder ? FolderIcon : PDFIcon}
            />
          );
        })}
        <fileSystemContext.Provider value={Files}>
          {Array.from(openedWindows, (v) => v[1]).map((window) => {
            return <Window key={window.fileName} window={window} />;
          })}
        </fileSystemContext.Provider>
      </DesktopSizeContext.Provider>
    </div>
  );
};
