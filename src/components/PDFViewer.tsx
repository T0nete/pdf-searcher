'use client';

import React from 'react';
import { getPdfUrl } from '@/lib/supabase/supabase-chats';
import LoadingIcon from './icons/LoadingIcon';

type PDFViewerProps = {
  chatId: string;
};

const PDFViewer = (props: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPdfUrl = async () => {
      const url = await getPdfUrl(props.chatId);
      setPdfUrl(url);
      setIsLoading(false);
    };

    fetchPdfUrl();
  }, [props.chatId]);

  if (isLoading) {
    return <LoadingIcon className="h-12 w-12 text-brand-orange" />;
  }
  if (!pdfUrl) {
    return <div>PDF not found</div>;
  }

  return (
    <embed
      src={pdfUrl}
      type="application/pdf"
      width="100%"
      height="100%"
      className="rounded-lg shadow-xl"
    />
  );
};

export default PDFViewer;
