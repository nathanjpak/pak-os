import PDFIcon from "../../../public/icons/pdf.svg";
import FolderIcon from "../../../public/icons/folder.svg";
import { useContext, useEffect, useState } from "react";
import fileSystemContext, {
  IFileSystem,
} from "../../contexts/fileSystemContext";
import { DesktopIcon } from "../Desktop/Icon";

interface IFolderViewerProps {
  rootPath: string[];
  folderName: string;
}

// TODO: traverse folders rather than open new ones

export const FolderViewer = ({ folderName, rootPath }: IFolderViewerProps) => {
  const Files = useContext(fileSystemContext);
  const [path, setPath] = useState(rootPath);
  let [folder, setFolder] = useState<IFileSystem | string>(Files);

  useEffect(() => {
    const updateFolder = async () => {
      let newFolder = folder;
      for (let level = 0; level < path.length; level++) {
        if (typeof newFolder !== "string") {
          newFolder = newFolder[path[level]];
        }
      }
      console.log("newFolder", newFolder);
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
            path={path}
          />
        );
      })}
    </div>
  );
};
