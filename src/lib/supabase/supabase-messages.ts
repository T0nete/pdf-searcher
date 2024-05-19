'use server';

import { createClient } from './serverClient';

export interface TMessage {
  chat_id: number;
  sender: TSender;
  message: string;
}
type TSender = 'user' | 'assistant';

export const createChatMessage = async (messages: TMessage[]) => {
  const { data, error } = await createClient()
    .from('messages')
    .insert(messages);

  if (error) {
    console.error('Error creating chat message:', error);
    return null;
  }

  return data;
};

export const getChatMessages = async (chatId: number) => {
  const { data, error } = await createClient()
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error getting chat messages:', error);
    return null;
  }

  return data;
};
