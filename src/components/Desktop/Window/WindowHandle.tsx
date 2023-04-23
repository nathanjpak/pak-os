import { Dispatch, SetStateAction, useContext, useState } from "react";
import WindowsContext from "../../../contexts/windowsContext";
import { Position } from "react-rnd";
import { Dimension } from ".";

interface IWindowHandleProps {
  fileName: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  setSize: Dispatch<SetStateAction<Dimension>>;
  parentWidth: number;
  parentHeight: number;
}

export const WindowHandle = ({
  fileName,
  setPosition,
  setSize,
  parentWidth,
  parentHeight,
}: IWindowHandleProps) => {
  const classNameString = `handle relative align-middle text-center py-1 bg-dark-navy text-slate-50 rounded-t`;
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [prevSize, setPrevSize] = useState<Dimension>({ width: 0, height: 0 });
  const { removeOpenedWindow } = useContext(WindowsContext);

  const toggleIsFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleResizeClick = () => {
    toggleIsFullScreen();
    if (!isFullScreen) {
      setPosition({ x: 0, y: 0 });
      setSize({ width: parentWidth, height: parentHeight });
    } else {
      setSize({ width: 100, height: 100 });
    }
  };

  return (
    <div className={classNameString}>
      {`${parentWidth} : ${parentHeight}`}
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
