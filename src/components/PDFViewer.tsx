import { getPdfUrl } from '@/lib/supabase/supabase-chats';

type PDFViewerProps = {
  chatId: string;
};

const PDFViewer = async (props: PDFViewerProps) => {
  const pdfUrl = await getPdfUrl(props.chatId);

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
