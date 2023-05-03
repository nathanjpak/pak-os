import { lazy, useContext, useRef, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";
import DockPreview from "./Preview";
import { IWindow } from "../../App";

const BrowserIcon = lazy(() => import("../../icons/BrowserIcon"));
const EditorIcon = lazy(() => import("../../icons/EditorIcon"));
const FolderViewerIcon = lazy(() => import("../../icons/FolderViewerIcon"));
const PhotoViewerIcon = lazy(() => import("../../icons/PhotoViewerIcon"));

interface IDockIconProps {
  fileType: string;
  count: number;
}

const DockIcon = ({ fileType, count }: IDockIconProps) => {
  const { openedWindows, addOpenedWindow } = useContext(WindowsContext);
  const [previewWindows, setPreviewWindows] = useState<IWindow[]>([]);

  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!count && fileType === "folder") {
      addOpenedWindow("", []);
    } else if (count === 1) {
      const window = Array.from(openedWindows, (arr) => arr[1]).find(
        (window) => window.fileType === fileType
      );
      addOpenedWindow(window!.fileName);
    } else {
      const windows = Array.from(openedWindows, (arr) => arr[1]).filter(
        (window) => window.fileType === fileType
      );
      setPreviewWindows(windows);
    }
  };

  return (
    <>
      <div
        className="flex gap-1 py-2 pr-2 rounded hover:bg-white/50"
        onClick={handleClick}
        ref={iconRef}
      >
        <div className="flex flex-col h-full justify-center items-center w-1.5 gap-1">
          {[...Array(Math.min(count, 3))].map((v, index) => {
            return (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
              />
            );
          })}
        </div>
        {fileType === "html" && <BrowserIcon />}
        {fileType === "md" && <EditorIcon />}
        {fileType === "folder" && <FolderViewerIcon />}
        {fileType === "pdf" && <PhotoViewerIcon />}
      </div>
      {!!previewWindows.length && (
        <DockPreview
          windows={previewWindows}
          parentRef={iconRef}
          closePreview={() => setPreviewWindows([])}
        />
      )}
    </>
  );
};

export default DockIcon;
