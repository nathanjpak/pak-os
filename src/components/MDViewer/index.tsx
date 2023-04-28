import { useState, useEffect, useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import fileSystemContext, {
  IFileSystem,
} from "../../contexts/fileSystemContext";

interface IMDViewerProps {
  path: string[];
}

const MDViewer = ({ path }: IMDViewerProps) => {
  const [content, setContent] = useState("");
  const Files = useContext(fileSystemContext);

  const errorMD = "## There was an error in displaying the markdown file.";

  useEffect(() => {
    console.log("path", path);
    let fileLocation: IFileSystem | string = Files;
    console.log(Files);
    for (let level = 0; level < path.length; level++) {
      if (typeof fileLocation !== "string")
        fileLocation = fileLocation[path[level]];
    }
    console.log("fileLocation", fileLocation);

    const updateContent = async (fileLocation: string) => {
      await fetch(fileLocation)
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
          console.log(text);
        })
        .catch(() => setContent(errorMD));
    };

    if (typeof fileLocation === "string") updateContent(fileLocation);
  }, []);

  return (
    <div>
      <ReactMarkdown className="markdown" children={content} />
    </div>
  );
};

export default MDViewer;
