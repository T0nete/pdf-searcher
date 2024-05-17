import { uploadFileToPinecone } from '@/lib/pinecone/pinecone';
import { createChat } from '@/lib/supabase/supabase-chats';
import { supabaseClient } from '@/lib/supabase/supabase-client';
import { getPublicUrl } from '@/lib/supabase/supabase-storage';
import { createUpload } from '@/lib/supabase/supabase-upload';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { fileName } = body as { fileName: string };

    if (!fileName) {
      return NextResponse.json(
        { message: 'File name is required' },
        { status: 400 }
      );
    }

    console.log('Uploading file to Pinecone');
    await uploadFileToPinecone(fileName);

    console.log('Uploading file to Pinecone');

    const newChatId = await createChat(fileName);

    if (!newChatId) {
      console.error('Error creating chat: ', newChatId);
      return NextResponse.json(
        { message: 'Error creating chat' },
        { status: 500 }
      );
    }

    // For unauthenticated users, we store the chat id in the upload table
    const ip =
      req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? '';

    console.log('Uploading file to Pinecone');

    await createUpload(newChatId, ip);

    return NextResponse.json({ chatId: newChatId });
  } catch (error) {
    console.error('Unexpected Error creating chat: ', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the chat' },
      { status: 500 }
    );
  }
};
