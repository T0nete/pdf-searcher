// type PDFViewerProps = {
//   pdfUrl: string;
// };

// const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
//   if (!pdfUrl) {
//     return <div>PDF not found</div>;
//   }

//   return (
//     <iframe
//       key={pdfUrl}
//       src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
//       width="100%"
//       height="100%"
//       className="rounded-lg shadow-xl"
//       onError={(e) => { console.log('IFRAME', e) }}
//     />
//   );
// };

// export default PDFViewer;
'use client';

import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type PDFViewerProps = {
  pdfUrl: string;
};

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!pdfUrl) {
    return <div>PDF not found</div>;
  }

  return (
    <div className="rounded-lg shadow-xl" style={{ height: '100%', width: '100%' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PDFViewer;

