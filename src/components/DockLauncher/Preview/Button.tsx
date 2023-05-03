import { useContext } from "react";
import { IWindow } from "../../../App";
import WindowsContext from "../../../contexts/windowsContext";

interface IDockPreviewButtonProps {
  window: IWindow;
  closePreview: () => void;
}

const DockPreviewButton = ({
  window,
  closePreview,
}: IDockPreviewButtonProps) => {
  const { addOpenedWindow } = useContext(WindowsContext);

  const handleClick = () => {
    addOpenedWindow(window.fileName);
    closePreview();
  };

  return (
    <button
      className="text-center w-full p-2 hover:bg-slate-400"
      onClick={handleClick}
    >
      {window.nameString}
    </button>
  );
};

export default DockPreviewButton;
