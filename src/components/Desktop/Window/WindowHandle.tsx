import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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

  const isFolder = window.fileType === "folder";

  const borderClassString = isFullScreen ? "" : "rounded-t";
  const focusClassString = isFocused ? "" : "opacity-70";

  const closeButtonClassString = isFocused
    ? "bg-red-400 hover:bg-red-300"
    : "bg-stone-400 hover:bg-stone-300";

  const { removeOpenedWindow, updateWindowHistory, toggleHidden } =
    useContext(WindowsContext);

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

  const backButtonDisabled = window.history.length < 1;
  const forwardButtonDisabled = window.future.length < 1;

  return (
    <div
      className={`handle select-none relative align-middle text-center py-1 bg-dark-navy text-slate-50 ${borderClassString} ${focusClassString}`}
    >
      {isFolder && (
        <div className="absolute start-1 top-px">
          <button
            className={
              backButtonDisabled
                ? "rounded w-6 h-6"
                : "rounded w-6 h-6 hover:bg-white/50"
            }
            onClick={() => updateWindowHistory(window.fileName, false)}
            disabled={backButtonDisabled}
          >
            {"\u02c2"}
          </button>
          <button
            className={
              forwardButtonDisabled
                ? "m-1 rounded w-6 h-6"
                : "m-1 rounded w-6 h-6 hover:bg-white/50"
            }
            onClick={() => updateWindowHistory(window.fileName, true)}
            disabled={forwardButtonDisabled}
          >
            {"\u02c3"}
          </button>
        </div>
      )}
      {window.nameString || "Desktop"}
      <div className="absolute end-1 top-px">
        <button
          className="rounded-full w-6 h-6 hover:bg-white/50"
          onClick={() => toggleHidden(window.fileName)}
        >
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
