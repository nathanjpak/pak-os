import { lazy } from "react";

const BrowserIcon = lazy(() => import("../../icons/BrowserIcon"));
const EditorIcon = lazy(() => import("../../icons/EditorIcon"));
const FolderViewerIcon = lazy(() => import("../../icons/FolderViewerIcon"));
const PhotoViewerIcon = lazy(() => import("../../icons/PhotoViewerIcon"));

interface IDockIconProps {
  fileType: string;
  count: number;
}

const DockIcon = ({ fileType, count }: IDockIconProps) => {
  return (
    <div className="flex relative gap-1 py-2 pr-2 rounded hover:bg-white/50">
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
