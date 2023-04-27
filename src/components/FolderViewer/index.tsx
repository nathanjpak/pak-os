import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { useContext, useEffect, useState } from "react";
import fileSystemContext, {
  IFileSystem,
} from "../../contexts/fileSystemContext";
import { DesktopIcon } from "../Desktop/Icon";
import { IWindow } from "../../App";

interface IFolderViewerProps {
  window: IWindow;
}

// TODO: traverse folders rather than open new ones

export const FolderViewer = ({ window }: IFolderViewerProps) => {
  const Files = useContext(fileSystemContext);

  const path = window.path;
  let [folder, setFolder] = useState<IFileSystem | string>(Files);

  useEffect(() => {
    console.log("Folder re-rendered");
    const updateFolder = async () => {
      let newFolder: IFileSystem | string = Files;
      for (let level = 0; level < path.length; level++) {
        if (typeof newFolder !== "string") {
          newFolder = newFolder[path[level]];
        }
      }
      setFolder(newFolder);
    };

    updateFolder();
  }, [path]);

  return (
    <div
      className="bg-white grid gap-0.5 grow"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 120px)",
        gridTemplateRows: "repeat(auto-fill, 90px)",
      }}
    >
      {Object.keys(folder).map((file) => {
        const isFolder = !file.includes(".");
        return (
          <DesktopIcon
            key={file}
            fileName={file}
            svg={isFolder ? FolderIcon : PDFIcon}
            path={[...path, file]}
            rootFileName={window.fileName}
          />
        );
      })}
    </div>
  );
};
