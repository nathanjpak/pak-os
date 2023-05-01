import { IWindow } from "../../../App";
import HTMLViewer from "../../Desktop/HTMLViewer";
import { Dimension } from "../../Desktop/Window";
import { FolderViewer } from "../../FolderViewer";
import MDViewer from "../../MDViewer";

interface IPreviewWindowProps {
  previewWindow: IWindow;
}

const PreviewWindow = ({ previewWindow }: IPreviewWindowProps) => {
  const defaultSize: Dimension = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <button className="hover:bg-slate-400/50" onClick={handleClick}>
      <div
        className="pointer-events-none flex justify-start"
        style={{ width: defaultSize.width, height: defaultSize.height }}
      >
        {previewWindow.fileType === "folder" && (
          <FolderViewer window={previewWindow} />
        )}
        {previewWindow.fileType === "md" && (
          <MDViewer path={previewWindow.path} />
        )}
        {previewWindow.fileType === "html" && (
          <HTMLViewer path={previewWindow.path} />
        )}
      </div>
    </button>
  );
};

export default PreviewWindow;
