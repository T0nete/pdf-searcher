'use server';

import { getPublicUrl } from '@/lib/supabase/supabase-storage';
import { createClient } from './serverClient';

export const getChatById = async (chatId: string) => {
  return createClient().from('chat').select('*').eq('id', chatId).single();
};

export const createChat = async (fileName: string, userId?: string) => {
  const { data, error } = await createClient()
    .from('chat')
    .insert({
      pdf_file_name: fileName,
      pdf_url: getPublicUrl(fileName).data.publicUrl,
      user_id: userId,
    })
    .select('id');

  if (error || !data) {
    console.error('Error creating chat: ', error);
    return null;
  }

  return data[0].id;
};

export const getPdfUrl = async (chatId: string) => {
  const { data, error } = await createClient()
    .from('chat')
    .select('pdf_url')
    .eq('id', chatId)
    .single();

  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return data.pdf_url;
};
