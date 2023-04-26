import { useContext, useRef, useState } from "react";
import useClickDetect from "../../../hooks/useClickDetect";
import WindowsContext from "../../../contexts/windowsContext";

interface DesktopIconProps {
  svg: string;
  fileName: string;
  path?: string[];
}

// TODO: figure out what to do with touch screens

export const DesktopIcon = ({ svg, fileName, path }: DesktopIconProps) => {
  const ref = useRef(null);
  const [isSelected, setIsSelected] = useState(false);

  const { addOpenedWindow } = useContext(WindowsContext);

  const bgColor = isSelected ? "bg-emerald-400/50" : "hover:bg-white/50";
  const containerClassName = `flex flex-col pt-2 h-[120px] w-[120px] justify-start rounded ${bgColor}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addOpenedWindow(fileName, path);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    addOpenedWindow(fileName, path);
  };

  useClickDetect(ref, () => setIsSelected(false), isSelected);

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      className={containerClassName}
      ref={ref}
    >
      <img className="self-center" src={svg} height={"40px"} width={"40px"} />
      <div className="text-center">{fileName}</div>
    </div>
  );
};
