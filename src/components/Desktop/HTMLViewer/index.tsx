import { useContext, useEffect, useState } from "react";
import fileSystemContext, {
  IFileSystem,
} from "../../../contexts/fileSystemContext";

interface IHTMLViewer {
  path: string[];
}

const HTMLViewer = ({ path }: IHTMLViewer) => {
  const [url, setUrl] = useState("");
  const Files = useContext(fileSystemContext);

  const defaultUrl = "https://www.google.com";

  useEffect(() => {
    let fileLocation: IFileSystem | string = Files;
    for (let level = 0; level < path.length; level++) {
      if (typeof fileLocation !== "string")
        fileLocation = fileLocation[path[level]];
    }

    typeof fileLocation === "string"
      ? setUrl(fileLocation)
      : setUrl(defaultUrl);
  }, []);

  return <iframe className="w-full h-full" src={url} />;
};

export default HTMLViewer;
