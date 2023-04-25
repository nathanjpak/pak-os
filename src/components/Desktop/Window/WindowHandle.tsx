import { Dispatch, SetStateAction, useContext, useState } from "react";
import WindowsContext from "../../../contexts/windowsContext";
import { Position } from "react-rnd";
import { Dimension } from ".";
import DesktopSizeContext from "../../../contexts/desktopSizeContext";
import { IWindow } from "../../../App";

interface IWindowHandleProps {
  window: IWindow;
  isFocused: boolean;
  setPosition: Dispatch<SetStateAction<Position>>;
  setSize: Dispatch<SetStateAction<Dimension>>;
  windowSize: Dimension;
  windowPosition: Position;
}

export const WindowHandle = ({
  window,
  isFocused,
  setPosition,
  setSize,
  windowSize,
  windowPosition,
}: IWindowHandleProps) => {
  const parentSize = useContext(DesktopSizeContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [prevSize, setPrevSize] = useState<Dimension | undefined>(undefined);
  const [prevPos, setPrevPos] = useState<Position | undefined>(undefined);

  const borderClassString = isFullScreen ? "" : "rounded-t";
  const focusClassString = isFocused ? "" : "opacity-70";

  const closeButtonClassString = isFocused
    ? "bg-red-400 hover:bg-red-300"
    : "bg-stone-400 hover:bg-stone-300";

  const { removeOpenedWindow } = useContext(WindowsContext);

  const toggleIsFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleResizeClick = () => {
    toggleIsFullScreen();
    if (!isFullScreen) {
      setPosition({ x: 0, y: 0 });
      setPrevPos(windowPosition);
      setPrevSize(windowSize);
      setSize({ width: parentSize.width, height: parentSize.height });
    } else {
      if (prevSize) {
        setSize(prevSize);
        setPrevSize(undefined);
      } else {
        setSize({
          width: parentSize.width / 2,
          height: parentSize.height / 2,
        });
      }
      if (prevPos) {
        setPosition(prevPos);
        setPrevPos(undefined);
      } else {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  return (
    <div
      className={`handle select-none relative align-middle text-center py-1 bg-dark-navy text-slate-50 ${borderClassString} ${focusClassString}`}
    >
      {`${parentSize.width} : ${parentSize.height}`}
      <div className="absolute end-1 top-px">
        <button className="rounded-full w-6 h-6 hover:bg-white/50">
          {"\u005f"}
        </button>
        <button
          className="m-1 rounded-full w-6 h-6 hover:bg-white/50"
          onClick={handleResizeClick}
        >
          {isFullScreen ? "\u29c9" : "\u2610"}
        </button>
        <button
          className={`rounded-full w-6 h-6 ${closeButtonClassString}`}
          onClick={() => removeOpenedWindow(window.fileName)}
        >
          {"\u2715"}
        </button>
      </div>
    </div>
  );
};
