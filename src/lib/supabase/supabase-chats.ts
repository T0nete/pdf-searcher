import { supabaseClient } from './supabase-client';
import { getPublicUrl } from './supabase-storage';

export const getChatById = async (chatId: string) => {
  return supabaseClient.from('chat').select('*').eq('id', chatId).single();
};

export const createChat = async (fileName: string) => {
  const { data, error } = await supabaseClient
    .from('chat')
    .insert({
      pdf_file_name: fileName,
      pdf_url: getPublicUrl(fileName).data.publicUrl,
      user_id: null,
    })
    .select('id');

  if (error || !data) {
    console.error('Error creating chat: ', error);
    return null;
  }

  return data[0].id;
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
