import { uploadFileToPinecone } from '@/lib/pinecone/pinecone';
import { supabaseClient } from '@/lib/supabase/supabase-client';
import { getPublicUrl } from '@/lib/supabase/supabase-storage';
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

    await uploadFileToPinecone(fileName);
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
      return NextResponse.json(
        { message: `Error creating chat: ${error?.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ chatId: data[0].id });
  } catch (error) {
    console.error('Unexpected Error creating chat: ', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the chat' },
      { status: 500 }
    );
  }
};
