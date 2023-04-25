import { Position, Rnd, RndResizeCallback } from "react-rnd";
import { WindowHandle } from "./WindowHandle";
import { useContext, useState } from "react";
import DesktopSizeContext from "../../../contexts/desktopSizeContext";

export type Dimension = {
  width: number;
  height: number;
};

export const Window = ({ fileName }: { fileName: string }) => {
  const parentSize = useContext(DesktopSizeContext);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Dimension>({
    width: parentSize.width / 2,
    height: parentSize.height / 2,
  });

  const handleResize: RndResizeCallback = (e, dir, ref, delta, pos) => {
    const newSize: Dimension = {
      width: size.width + delta.width,
      height: size.height + delta.height,
    };

    setSize(newSize);
    setPosition(pos);
  };

  // const dotIndex = fileName.lastIndexOf(".");
  // // This does not account for folder with . in the name
  // const fileType = (dotIndex > -1) ?  : "folder";

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        height: size.height,
        width: size.width,
      }}
      size={{
        width: size.width,
        height: size.height,
      }}
      position={{
        x: position.x,
        y: position.y,
      }}
      onDragStop={(e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={handleResize}
      maxWidth={parentSize.width}
      maxHeight={parentSize.height}
      bounds="parent"
      dragHandleClassName="handle"
      className="bg-white rounded-t"
    >
      <WindowHandle
        fileName={fileName}
        setPosition={setPosition}
        setSize={setSize}
        windowSize={size}
        windowPosition={position}
      />
      Draggable {fileName}
      <p>
        {position.x}, {position.y}
      </p>
      <p>
        {size.width}, {size.height}
      </p>
      <p>
        Context: {parentSize.width}, {parentSize.height}
      </p>
    </Rnd>
  );
};
