'use server';

import { getPublicUrl } from '@/lib/supabase/supabase-storage';
import { createClient } from './serverClient';
import { Chat } from '@/types/supabase-databse';

export const getChatById = async (chatId: string) => {
  return createClient().from('chat').select('*').eq('id', chatId).single();
};

export const getChatsByIp = async (ip: string) => {
  const { data, error } = await createClient()
    .from('upload')
    .select(
      `
        chat(*)
        `
    )
    .eq('ip_address', ip);

  if (error || !data || data.length === 0) {
    console.error('Error getting chat: ', error);
    return null;
  }

  const chats = data.flatMap((item) => item.chat);
  return chats as Chat[];
};

export const getChatsByUserId = async (userId: string) => {
  const { data, error } = await createClient()
    .from('chat')
    .select('*')
    .eq('user_id', userId);

  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return data as Chat[];
};

interface ICreateChat {
  fileName: string;
  userId?: string;
  ip?: string;
}
export const createChat = async (chatData: ICreateChat) => {
  const { data, error } = await createClient()
    .from('chat')
    .insert({
      pdf_file_name: chatData.fileName,
      pdf_url: getPublicUrl(chatData.fileName).data.publicUrl,
      user_id: chatData.userId,
      ip: chatData.ip,
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
