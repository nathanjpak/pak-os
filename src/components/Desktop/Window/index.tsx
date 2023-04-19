import { Rnd } from "react-rnd";
import { WindowHandle } from "./WindowHandle";

export const Window = ({ fileName }: { fileName: string }) => {
  const parentWidth = parent.innerWidth;
  const parentHeight = parent.innerHeight;

  return (
    <Rnd
      default={{ x: 0, y: 0, height: parentHeight / 2, width: parentWidth / 2 }}
      bounds="parent"
      dragHandleClassName="handle"
      className="bg-white rounded-t"
    >
      <WindowHandle />
      Draggable {fileName}
    </Rnd>
  );
};
