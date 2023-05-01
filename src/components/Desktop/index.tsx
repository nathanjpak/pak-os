import { DesktopIcon } from "./Icon";
import { useContext, useEffect, useRef, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";
import { Window } from "./Window";
import DesktopSizeContext from "../../contexts/desktopSizeContext";
import fileSystemContext from "../../contexts/fileSystemContext";

export const Desktop = () => {
  const { openedWindows, focusWindow, setFocusWindow } =
    useContext(WindowsContext);

  const Files = useContext(fileSystemContext);

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
          return (
            <DesktopIcon
              key={file}
              fileName={file}
              fileType={file.split(".")[1] || "folder"}
            />
          );
        })}
        {Array.from(openedWindows, (v) => v[1]).map((window) => {
          if (window.hidden) return;
          return <Window key={window.fileName} window={window} />;
        })}
      </DesktopSizeContext.Provider>
    </div>
  );
};
