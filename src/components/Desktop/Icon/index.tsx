import { lazy, useContext, useRef, useState } from "react";
import useClickDetect from "../../../hooks/useClickDetect";
import WindowsContext from "../../../contexts/windowsContext";
import fileSystemContext, {
  IFileSystem,
} from "../../../contexts/fileSystemContext";

interface DesktopIconProps {
  fileName: string;
  path?: string[];
  rootFileName?: string;
  fileType: string;
}

// TODO: figure out what to do with touch screens

const FolderIcon = lazy(() => import("../../../icons/FolderIcon"));
const HtmlIcon = lazy(() => import("../../../icons/HTMLIcon"));
const LinkIcon = lazy(() => import("../../../icons/LinkIcon"));
const MdIcon = lazy(() => import("../../../icons/MDIcon"));
const PdfIcon = lazy(() => import("../../../icons/PDFIcon"));

export const DesktopIcon = ({
  fileName,
  path,
  rootFileName,
  fileType,
}: DesktopIconProps) => {
  const ref = useRef(null);
  const [isSelected, setIsSelected] = useState(false);

  const { addOpenedWindow, updateWindowPath } = useContext(WindowsContext);
  const Files = useContext(fileSystemContext);

  const bgColor = isSelected ? "bg-emerald-400/50" : "hover:bg-white/50";
  const containerClassName = `flex flex-col pt-2 h-[120px] w-[120px] justify-start rounded ${bgColor}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleDoubleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    fileType === "link" ? openUrl() : openWindow();
  };

  const openUrl = async () => {
    let fileLocation: IFileSystem | string = Files;

    for (let level = 0; level < path!.length; level++) {
      if (typeof fileLocation !== "string") {
        fileLocation = fileLocation[path![level]];
      }
    }

    if (typeof fileLocation === "string")
      window.open(fileLocation, "_blank", "noreferrer");
  };

  const openWindow = () => {
    if (!fileName.includes(".") && path) {
      updateWindowPath(rootFileName!, [...path]);
      return;
    }
    addOpenedWindow(fileName, path);
  };

  useClickDetect(ref, () => setIsSelected(false), isSelected);

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={(e) => handleDoubleClick(e)}
      className={containerClassName}
      ref={ref}
    >
      {fileType === "folder" && <FolderIcon />}
      {fileType === "html" && <HtmlIcon />}
      {fileType === "link" && <LinkIcon />}
      {fileType === "md" && <MdIcon />}
      {fileType === "pdf" && <PdfIcon />}
      <div className="text-center">{fileName}</div>
    </div>
  );
};
