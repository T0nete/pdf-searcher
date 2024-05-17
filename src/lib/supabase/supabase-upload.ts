import { supabaseClient } from './supabase-client';

type UploadWithChat = {
  pdf_id: number;
  chat: {
    pdf_file_name: string | null;
  } | null;
};
export const getFileNameByIPAndFileName = async (ip: string) => {
  const { data, error } = await supabaseClient
    .from('upload')
    .select(
      `
        pdf_id,
        chat:chat (pdf_file_name)
        `
    )
    .eq('ip_address', ip);

  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return data as UploadWithChat[];
};

export const createUpload = async (pdfId: number, ip: string) => {
  return await supabaseClient.from('upload').insert({
    pdf_id: pdfId,
    ip_address: ip,
  });
};
