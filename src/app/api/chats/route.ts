import { createClient } from '@/lib/supabase/serverClient';
import { getChatsByIp, getChatsByUserId } from '@/lib/supabase/supabase-chats';
import { Chat } from '@/types/supabase-databse';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = await createClient().auth.getUser();

    let chats: Chat[] | null = null;

    if (!user || !user.data || !user.data.user) {
      // Fetch the chat data by ip
      const ip =
        req.headers.get('x-real-ip') ||
        req.headers.get('x-forwarded-for') ||
        req.ip;

      if (!ip) {
        console.error('Error getting ip');
        return NextResponse.json(
          { success: false, message: 'Error getting ip' },
          { status: 400 }
        );
      }
      chats = await getChatsByIp(ip);
    } else {
      // Fetch the chat data by user id
      chats = await getChatsByUserId(user.data.user.id);
    }

    return NextResponse.json({ success: true, data: chats });
  } catch (error) {
    console.error('Unexpected Error getting chats: ', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while getting the chats' },
      { status: 500 }
    );
  }
};
