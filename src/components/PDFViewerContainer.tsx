import React from 'react';
import PDFViewer from './PDFViewer';

type Props = {
  pdfUrl: string;
};

const PDFViewerServer = ({ pdfUrl }: Props) => {
  return (
    <PDFViewer pdfUrl={pdfUrl} />
  );
};

export default PDFViewerServer;
