import React from 'react';

type PDFViewerProps = {
  pdfUrl: string;
};

const PDFViewer = (props: PDFViewerProps) => {
  if (!props.pdfUrl) {
    return <div>PDF not found</div>;
  }

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
