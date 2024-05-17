import { Database } from './supabase';

export type Chat = Database['public']['Tables']['chat']['Row'];
export type Messages = Database['public']['Tables']['messages']['Row'];
