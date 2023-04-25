import { Dispatch, SetStateAction, useContext, useState } from "react";
import WindowsContext from "../../../contexts/windowsContext";
import { Position } from "react-rnd";
import { Dimension } from ".";
import DesktopSizeContext from "../../../contexts/desktopSizeContext";

interface IWindowHandleProps {
  fileName: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  setSize: Dispatch<SetStateAction<Dimension>>;
  windowSize: Dimension;
  windowPosition: Position;
}

export const WindowHandle = ({
  fileName,
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
  const classNameString = `handle relative align-middle text-center py-1 bg-dark-navy text-slate-50 ${borderClassString}`;

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
    <div className={classNameString}>
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
          className="bg-red-400 rounded-full w-6 h-6 hover:bg-red-300"
          onClick={() => removeOpenedWindow(fileName)}
        >
          {"\u2715"}
        </button>
      </div>
    </div>
  );
};
