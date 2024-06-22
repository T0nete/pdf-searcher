'use server';

import { getPublicUrl } from '@/lib/supabase/supabase-storage';
import { createClient } from './serverClient';
import { Chat } from '@/types/supabase-databse';

export const getChatById = async (chatId: string) => {
  const { data, error } = await createClient()
    .from('chat')
    .select('*')
    .eq('id', chatId)
    .single();

  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return data as Chat;
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

export const getLastChatByUserId = async (userId: string) => {
  const { data, error } = await createClient()
    .from('chat')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    console.error('Error getting chat: ', error);
    return null;
  }

  return data as Chat;
}

interface ICreateChat {
  fileName: string;
  fileKey: string;
  userId?: string;
  ip?: string;
}
export const createChat = async (chatData: ICreateChat) => {
  const { data, error } = await createClient()
    .from('chat')
    .insert({
      pdf_file_name: chatData.fileName,
      pdf_url: getPublicUrl(chatData.fileKey).data.publicUrl,
      user_id: chatData.userId,
      ip: chatData.ip,
      pdf_key: chatData.fileKey,
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

export const updateChatWithUserIdById = async (
  chatId: string,
  userId: string
) => {
  const { error } = await createClient()
    .from('chat')
    .update({ user_id: userId })
    .eq('id', chatId);

  if (error) {
    console.error('Error updating chat with user_id: ', error);
    return null;
  }

  return true;
};

export const deleteChat = async (id: number) => {
  // Remove chat from database
  const { error: dbError } = await createClient()
    .from('chat')
    .delete()
    .eq('id', id);

  if (dbError) {
    console.error('Error removing chat from database: ', dbError);
    return false;
  }

  return true;
}