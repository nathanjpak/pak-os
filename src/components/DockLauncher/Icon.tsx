import { lazy, useContext } from "react";
import WindowsContext from "../../contexts/windowsContext";

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
  const handleClick = () => {
    if (!count && fileType === "folder") {
      addOpenedWindow("", []);
    }
  };

  return (
    <div
      className="flex relative gap-1 py-2 pr-2 rounded hover:bg-white/50"
      onClick={handleClick}
    >
      <div className="flex flex-col h-full justify-center items-center w-1.5 gap-1">
        {[...Array(Math.min(count, 3))].map(() => {
          return <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />;
        })}
      </div>
      {fileType === "html" && <BrowserIcon />}
      {fileType === "md" && <EditorIcon />}
      {fileType === "folder" && <FolderViewerIcon />}
      {fileType === "pdf" && <PhotoViewerIcon />}
    </div>
  );
};

export default DockIcon;
