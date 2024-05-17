import { getChatMessages } from '@/lib/supabase/supabase-messages';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const { chatId } = Object.fromEntries(searchParams);

    if (!chatId) {
      return NextResponse.json(
        { message: 'Chat id is required' },
        { status: 400 }
      );
    }

    const chatIdNumber = parseInt(chatId);
    if (isNaN(chatIdNumber)) {
      return NextResponse.json(
        { message: 'Chat id must be a number' },
        { status: 400 }
      );
    }

    const messages = await getChatMessages(chatIdNumber);
    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error('Unexpected Error getting chat messages: ', error);
    return NextResponse.json(
      { message: 'An error occurred while getting the chat messages' },
      { status: 500 }
    );
  }
};
