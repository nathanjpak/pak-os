import { Rnd } from "react-rnd";
import { WindowHandle } from "./WindowHandle";

export const Window = ({ fileName }: { fileName: string }) => {
  const parentWidth = parent.innerWidth;
  const parentHeight = parent.innerHeight;

  // const dotIndex = fileName.lastIndexOf(".");
  // // This does not account for folder with . in the name
  // const fileType = (dotIndex > -1) ?  : "folder";

  return (
    <Rnd
      default={{ x: 0, y: 0, height: parentHeight / 2, width: parentWidth / 2 }}
      bounds="parent"
      dragHandleClassName="handle"
      className="bg-white rounded-t"
    >
      <WindowHandle fileName={fileName} />
      Draggable {fileName}
    </Rnd>
  );
};
