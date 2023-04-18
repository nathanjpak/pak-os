import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { DesktopIcon } from "./Icon";

export const Desktop = () => {
  return (
    <div className="grid grow">
      <DesktopIcon fileName="Resume.pdf" svg={PDFIcon} />
      <DesktopIcon fileName="Projects" svg={FolderIcon} />
    </div>
  );
};
