// app/components/PDFViewerServer.tsx
import React from 'react';
import PDFViewer from './PDFViewer';

type Props = {
  pdfUrl: string;
};

const PDFViewerServer = ({ pdfUrl }: Props) => {
  return (
    <div>
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default PDFViewerServer;
