import { useState } from "react";

interface IWindowHandleProps {
  fileName: string;
}

export const WindowHandle = ({ fileName }: IWindowHandleProps) => {
  const classNameString = `handle relative align-middle text-center py-1 bg-dark-navy text-slate-50 rounded-t`;
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleIsFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div className={classNameString}>
      {fileName}
      <div className="absolute end-1 top-px">
        <button className="rounded-full w-6 h-6 hover:bg-white/50">
          {"\u005f"}
        </button>
        <button
          className="m-1 rounded-full w-6 h-6 hover:bg-white/50"
          onClick={toggleIsFullScreen}
        >
          {isFullScreen ? "\u29c9" : "\u2610"}
        </button>
        <button className="bg-red-400 rounded-full w-6 h-6 hover:bg-red-300">
          {"\u2715"}
        </button>
      </div>
    </div>
  );
};
