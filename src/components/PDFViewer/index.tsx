import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import Resume from "../../../public/files/Resume.pdf";
import { Dimension } from "../Desktop/Window";
import { PDFPageProxy } from "react-pdf";
import { useEffect, useState } from "react";

interface IPDFViewerProps {
  fileName: "Resume.pdf" | string;
  windowSize: Dimension;
}

export const PDFViewer = ({ fileName, windowSize }: IPDFViewerProps) => {
  const pdfMap = {
    "Resume.pdf": Resume,
  };

  const [xJustification, setXJustification] = useState("justify-center");
  const [yJustificiation, setYJustification] = useState("items-center");
  const [pdfSize, setPdfSize] = useState<Dimension | undefined>(undefined);

  useEffect(() => {
    if (!pdfSize) return;

    const newXJustification =
      pdfSize.width > windowSize.width - 32
        ? "justify-start"
        : "justify-center";
    const newYJustificiation =
      pdfSize.height > windowSize.height - 32 ? "items-start" : "items-center";

    if (newXJustification !== xJustification)
      setXJustification(newXJustification);
    if (newYJustificiation !== yJustificiation)
      setYJustification(newYJustificiation);
  }, [windowSize, pdfSize]);

  const handleLoadSuccess = async (page: PDFPageProxy) => {
    setPdfSize({ width: page.originalWidth, height: page.originalHeight });
  };

  if (fileName === "Resume.pdf")
    return (
      <div
        className={`flex p-4 w-full h-full overflow-auto ${xJustification} ${yJustificiation}`}
      >
        <Document file={pdfMap[fileName]}>
          <Page
            pageIndex={0}
            className="drop-shadow-md"
            renderMode="canvas"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onLoadSuccess={handleLoadSuccess}
          ></Page>
        </Document>
      </div>
    );
  return (
    <div className="flex p-4 justify-center w-full h-full overflow-auto">
      Could not find file with that name!
    </div>
  );
};
