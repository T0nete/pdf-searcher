import { getContext } from '@/lib/pinecone/pinecone-context';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { fileName } = await req.json();
  const response = await getContext(
    'What is the name of the person?',
    fileName
  );

  return NextResponse.json({ response });
};
