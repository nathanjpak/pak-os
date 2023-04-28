import { Position, Rnd, RndResizeCallback } from "react-rnd";
import { WindowHandle } from "./WindowHandle";
import { useContext, useState } from "react";
import DesktopSizeContext from "../../../contexts/desktopSizeContext";
import { IWindow } from "../../../App";
import WindowsContext from "../../../contexts/windowsContext";
import { FolderViewer } from "../../FolderViewer";
import { PDFViewer } from "../../PDFViewer";
import MDViewer from "../../MDViewer";

export type Dimension = {
  width: number;
  height: number;
};

export const Window = ({ window }: { window: IWindow }) => {
  const parentSize = useContext(DesktopSizeContext);
  const { openedWindows, focusWindow, setFocusWindow } =
    useContext(WindowsContext);
  const isFocused = focusWindow === window.fileName;

  const initialPosition: Position = {
    x: Math.min(20 * openedWindows.size, parentSize.width / 2),
    y: Math.min(20 * openedWindows.size, parentSize.height / 2),
  };

  const [position, setPosition] = useState<Position>(initialPosition);
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

  const focusClassString = isFocused ? "z-10" : "z-0";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFocused) return;
    setFocusWindow(window.fileName);
  };

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
      className={`bg-white rounded-t drop-shadow-md !flex flex-col ${focusClassString}`}
      onClick={handleClick}
    >
      <WindowHandle
        window={window}
        isFocused={isFocused}
        setPosition={setPosition}
        setSize={setSize}
        windowSize={size}
        windowPosition={position}
      />
      {window.fileType === "folder" && <FolderViewer window={window} />}
      {window.fileType === "pdf" && (
        <PDFViewer fileName={window.fileName} windowSize={size} />
      )}
      {window.fileType === "md" && <MDViewer path={window.path} />}
    </Rnd>
  );
};
