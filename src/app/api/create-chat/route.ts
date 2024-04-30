import { uploadFileToPinecone } from '@/lib/pinecone/pinecone';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    console.log(body);
    const { fileName } = body;

    await uploadFileToPinecone(fileName);
    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {}
};
