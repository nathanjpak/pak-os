import { Position, Rnd, RndResizeCallback } from "react-rnd";
import { WindowHandle } from "./WindowHandle";
import { useContext, useState } from "react";
import DesktopSizeContext from "../../../contexts/desktopSizeContext";
import { IWindow } from "../../../App";

export type Dimension = {
  width: number;
  height: number;
};

export const Window = ({ window }: { window: IWindow }) => {
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

  const focusClassString = window.focused ? "z-10" : "z-0";

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
      minWidth={200}
      minHeight={300}
      maxWidth={parentSize.width}
      maxHeight={parentSize.height}
      bounds="parent"
      dragHandleClassName="handle"
      className={`bg-white rounded-t drop-shadow-md ${focusClassString}`}
    >
      <WindowHandle
        window={window}
        setPosition={setPosition}
        setSize={setSize}
        windowSize={size}
        windowPosition={position}
      />
      Draggable {window.fileName}
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
