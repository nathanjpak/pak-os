import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { DesktopIcon } from "./Icon";
import { useContext } from "react";
import WindowsContext from "../../contexts/windowsContext";
import { Window } from "./Window";

export const Desktop = () => {
  const { openedWindows } = useContext(WindowsContext);

  return (
    <div
      className="grid gap-0.5 grow grid-flow-col"
      style={{
        gridTemplateColumns: `repeat(auto-fill, 120px)`,
        gridTemplateRows: `repeat(auto-fill, 120px)`,
      }}
    >
      <DesktopIcon fileName="Resume.pdf" svg={PDFIcon} />
      <DesktopIcon fileName="Projects" svg={FolderIcon} />
      {openedWindows.map((fileName: string) => {
        return <Window fileName={fileName} />;
      })}
    </div>
  );
};
