import { supabaseClient } from './supabase-client';

export const getChatById = async (chatId: string) => {
  return supabaseClient.from('chat').select('*').eq('id', chatId).single();
};

export const getPdfUrl = async (chatId: string) => {
  const { data, error } = await supabaseClient
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
