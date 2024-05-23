import { uploadFileToPinecone } from '@/lib/pinecone/pinecone';
import { createClient } from '@/lib/supabase/serverClient';
import { createChat } from '@/lib/supabase/supabase-chats';
import { createUpload } from '@/lib/supabase/supabase-upload';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { fileName, fileKey } = body as { fileName: string; fileKey: string };

    if (!fileName) {
      return NextResponse.json(
        { message: 'File name is required' },
        { status: 400 }
      );
    }

    console.log('Uploading file to Pinecone');
    await uploadFileToPinecone(fileKey);

    const user = await createClient().auth.getUser();
    const ip =
      req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? '';

    console.log('Creating chat in Supabase');
    const newChatId = await createChat({
      fileName,
      userId: user?.data.user?.id,
      ip,
      fileKey,
    });

    if (!newChatId) {
      console.error('Error creating chat: ', newChatId);
      return NextResponse.json(
        { message: 'Error creating chat' },
        { status: 500 }
      );
    }

    // For unauthenticated users, we store the chat id in the upload table
    if (!user?.data || !user?.data.user) {
      console.log('Creating upload for unauthenticated user');
      await createUpload(newChatId, ip);
    }

    return NextResponse.json({ chatId: newChatId });
  } catch (error) {
    console.error('Unexpected Error creating chat: ', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the chat' },
      { status: 500 }
    );
  }
};
