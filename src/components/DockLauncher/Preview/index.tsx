import { useEffect, useState } from "react";
import { IWindow } from "../../../App";
import ClickDetectWrapper from "../../../utils/CreateDetectWrapper";
// import PreviewWindow from "./Window";

interface IDockPreviewProps {
  windows: IWindow[];
  parentRef: React.RefObject<HTMLDivElement>;
  closePreview: () => void;
}

const DockPreview = ({
  windows,
  parentRef,
  closePreview,
}: IDockPreviewProps) => {
  const [left, setLeft] = useState(66 + 8);
  const [top, setTop] = useState(0);
  const [triangleTop, setTriangleTop] = useState(0);
  useEffect(() => {
    if (!parentRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    if (parentRect.right + 4 !== left) setLeft(parentRect.right + 4);
    const buffer = 24;
    const parentMidpt = (parentRect.top + parentRect.bottom) / 2 - buffer;

    if (parentMidpt - 5 !== triangleTop) setTriangleTop(parentMidpt - 5);

    const previewHeight = 32 + 40 * windows.length;
    const previewTop =
      parentMidpt < previewHeight / 2 ? 0 : parentMidpt - previewHeight / 2;
    if (previewTop !== top) setTop(previewTop);
  }, [parentRef.current?.clientWidth, windows.length]);

  const triangleClassString =
    "absolute w-0 h-0 border-[10px] border-transparent border-r-slate-200 border-l-0";

  return (
    <ClickDetectWrapper callback={closePreview}>
      <div
        className={triangleClassString}
        style={{ left: left - 10, top: triangleTop }}
      ></div>
      <div
        className={`absolute flex flex-col items-start justify-start py-4 bg-slate-200 rounded-lg w-[120px]`}
        style={{ left: left, top: top }}
      >
        {windows.map((window) => {
          return (
            <button
              key={window.fileName}
              className="text-center w-full p-2 hover:bg-slate-400"
            >
              {window.nameString}
            </button>
          );
        })}
      </div>
    </ClickDetectWrapper>
  );
};

export default DockPreview;
