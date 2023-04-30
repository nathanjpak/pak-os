import { useContext, useEffect, useState } from "react";
import fileSystemContext, {
  IFileSystem,
} from "../../contexts/fileSystemContext";
import { DesktopIcon } from "../Desktop/Icon";
import { IWindow } from "../../App";

interface IFolderViewerProps {
  window: IWindow;
}

export const FolderViewer = ({ window }: IFolderViewerProps) => {
  const Files = useContext(fileSystemContext);

  const path = window.path;
  let [folder, setFolder] = useState<IFileSystem | string>(Files);

  useEffect(() => {
    const updateFolder = () => {
      let newFolder: IFileSystem | string = Files;
      for (let level = 0; level < path.length; level++) {
        if (typeof newFolder !== "string") {
          if (path[level] === "") continue;
          newFolder = newFolder[path[level]];
        }
      }
      if (newFolder) setFolder(newFolder);
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
        return (
          <DesktopIcon
            key={file}
            fileName={file}
            path={[...path, file]}
            rootFileName={window.fileName}
            fileType={file.split(".")[1] || "folder"}
          />
        );
      })}
    </div>
  );
};
