type PDFViewerProps = {
  pdfUrl: string;
};

const PDFViewer = (props: PDFViewerProps) => {
  return (
    <embed
      src={props.pdfUrl}
      type="application/pdf"
      width="100%"
      height="100%"
      className="rounded-lg shadow-xl"
    />
  );
};

export default PDFViewer;
