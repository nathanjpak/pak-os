import {
  Dispatch,
  SetStateAction,
  lazy,
  useContext,
  useRef,
  useState,
} from "react";
import useClickDetect from "../../../hooks/useClickDetect";
import WindowsContext from "../../../contexts/windowsContext";

interface DesktopIconProps {
  fileName: string;
  path?: string[];
  rootFileName?: string;
  fileType: string;
}

// TODO: figure out what to do with touch screens

const FolderIcon = lazy(() => import("../../../icons/FolderIcon"));
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

  const bgColor = isSelected ? "bg-emerald-400/50" : "hover:bg-white/50";
  const containerClassName = `flex flex-col pt-2 h-[120px] w-[120px] justify-start rounded ${bgColor}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWindow();
  };

  const openWindow = () => {
    if (!fileName.includes(".") && path) {
      console.log("Should open same window");
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
      onTouchEnd={openWindow}
      className={containerClassName}
      ref={ref}
    >
      {/* <img className="self-center" src={svg} height={"40px"} width={"40px"} /> */}
      {fileType === "folder" && <FolderIcon />}
      {fileType === "link" && <LinkIcon />}
      {fileType === "md" && <MdIcon />}
      {fileType === "pdf" && <PdfIcon />}
      <div className="text-center">{fileName}</div>
    </div>
  );
};
