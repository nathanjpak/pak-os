import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { DesktopIcon } from "./Icon";

export const Desktop = () => {
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
    </div>
  );
};
