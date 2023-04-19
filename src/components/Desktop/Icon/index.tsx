import { useContext, useRef, useState } from "react";
import useClickDetect from "../../../hooks/useClickDetect";
import WindowsContext from "../../../contexts/windowsContext";

interface DesktopIconProps {
  svg: string;
  fileName: string;
}

export const DesktopIcon = ({ svg, fileName }: DesktopIconProps) => {
  const ref = useRef(null);
  const [isSelected, setIsSelected] = useState(false);

  const { addOpenedWindow } = useContext(WindowsContext);

  const bgColor = isSelected ? "bg-emerald-400/50" : "hover:bg-white/50";
  const containerClassName = `flex flex-col pt-2 h-[120px] w-[120px] justify-start rounded ${bgColor}`;

  const handleClick = () => {
    setIsSelected(!isSelected);
    addOpenedWindow(fileName);
  };

  useClickDetect(ref, () => setIsSelected(false), isSelected);

  return (
    <div onClick={handleClick} className={containerClassName} ref={ref}>
      <img className="self-center" src={svg} height={"40px"} width={"40px"} />
      <div className="text-center">{fileName}</div>
    </div>
  );
};
