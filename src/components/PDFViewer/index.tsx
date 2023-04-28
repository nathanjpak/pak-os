import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import Resume from "../../../public/files/Resume.pdf";

interface IPDFViewerProps {
  fileName: "Resume.pdf" | string;
}

export const PDFViewer = ({ fileName }: IPDFViewerProps) => {
  const pdfMap = {
    "Resume.pdf": Resume,
  };

  if (fileName === "Resume.pdf")
    return (
      <div className="flex justify-center w-full h-full overflow-auto">
        <Document file={pdfMap[fileName]}>
          <Page
            pageIndex={0}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          ></Page>
        </Document>
      </div>
    );
};
