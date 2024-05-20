'use server';

import { createClient } from './serverClient';

type UploadWithChat = {
  id: number | null;
  pdf_file_name: string | null;
};
export const getChatByUserIdAndFileName = async (
  userId: string,
  fileName: string
) => {
  const { data, error } = await createClient()
    .from('chat')
    .select(
      `
        id,
        pdf_file_name
        `
    )
    .eq('user_id', userId)
    .eq('pdf_file_name', fileName);

  console.log(data);
  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }
  console.log(data);

  return data as UploadWithChat[];
};

export const getChatByIPAndFileName = async (ip: string) => {
  const { data, error } = await createClient()
    .from('upload')
    .select(
      `
        pdf_id,
        chat:chat (pdf_file_name)
        `
    )
    .eq('ip_address', ip);

  if (error || !data || data.length === 0) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return [
    {
      id: data[0].pdf_id,
      pdf_file_name: data[0].chat?.pdf_file_name,
    },
  ] as UploadWithChat[];
};

export const createUpload = async (pdfId: number, ip: string) => {
  return await createClient().from('upload').insert({
    pdf_id: pdfId,
    ip_address: ip,
  });
};
