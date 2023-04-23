import { Position, Rnd, RndResizeCallback } from "react-rnd";
import { WindowHandle } from "./WindowHandle";
import { useState } from "react";

export type Dimension = {
  width: number;
  height: number;
};

export const Window = ({ fileName }: { fileName: string }) => {
  const parentWidth = parent.innerWidth;
  const parentHeight = parent.innerHeight;

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Dimension>({
    width: parentWidth / 2,
    height: parentHeight / 2,
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
      maxWidth={parentWidth}
      maxHeight={parentHeight}
      bounds="parent"
      dragHandleClassName="handle"
      className="bg-white rounded-t"
    >
      <WindowHandle
        fileName={fileName}
        setPosition={setPosition}
        setSize={setSize}
        parentWidth={parentWidth}
        parentHeight={parentHeight}
      />
      Draggable {fileName}
      <p>
        {position.x}, {position.y}
      </p>
      <p>
        {size.width}, {size.height}
      </p>
    </Rnd>
  );
};
