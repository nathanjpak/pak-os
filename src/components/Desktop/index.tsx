import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { DesktopIcon } from "./Icon";
import { useContext, useEffect, useRef, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";
import { Window } from "./Window";
import DesktopSizeContext from "../../contexts/desktopSizeContext";

export const Desktop = () => {
  const { openedWindows } = useContext(WindowsContext);

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

  return (
    <div
      ref={ref}
      className="grid gap-0.5 grow grid-flow-col"
      style={{
        gridTemplateColumns: `repeat(auto-fill, 120px)`,
        gridTemplateRows: `repeat(auto-fill, 120px)`,
      }}
    >
      <DesktopSizeContext.Provider value={size}>
        <DesktopIcon fileName="Resume.pdf" svg={PDFIcon} />
        <DesktopIcon fileName="Projects" svg={FolderIcon} />
        {Array.from(openedWindows, (v) => v[1]).map((window) => {
          return <Window key={window.fileName} fileName={window.fileName} />;
        })}
      </DesktopSizeContext.Provider>
    </div>
  );
};
