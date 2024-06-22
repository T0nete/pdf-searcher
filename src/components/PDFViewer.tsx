'use client';

import React, { useState, useEffect } from 'react';

type PDFViewerProps = {
  pdfUrl: string;
};

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  if (!pdfUrl) {
    return <div>PDF not found</div>;
  }

  return (
    <iframe
      key={pdfUrl}
      // src={`https://drive.google.com/file/d/${pdfUrl}}/preview`}
      src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
      width="100%"
      height="100%"
      className="rounded-lg shadow-xl"
    />
  );
};

export default PDFViewer;
