import OpenAI from 'openai';
import { Message, OpenAIStream, StreamingTextResponse } from 'ai';
import { getContext } from '@/lib/pinecone/pinecone-context';
import { NextRequest, NextResponse } from 'next/server';
import {
  getChatByIPAndFileName,
  getChatByUserIdAndFileName,
} from '@/lib/supabase/supabase-upload';
import { createChatMessage } from '@/lib/supabase/supabase-messages';
import { createClient } from '@/lib/supabase/serverClient';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { chatId, messages, fileKey } = await req.json();

    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);

    const prompt = [
      {
        role: 'system',
        content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
        `,
      },
    ];

    const userMessages = messages.filter(
      (message: Message) => message.role === 'user'
    );

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [...prompt, ...userMessages],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        await createChatMessage([
          {
            chat_id: chatId,
            sender: 'user',
            message: lastMessage.content,
          },
        ]);
      },
      onCompletion: async (completion: string) => {
        await createChatMessage([
          { chat_id: chatId, sender: 'assistant', message: completion },
        ]);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { fileName } = Object.fromEntries(searchParams);

    const user = await createClient().auth.getUser();

    // Get the chat from the authenticated user
    if (user.data.user) {
      return authorizedUserChat(user.data.user.id, fileName);
    }

    // Unauthorized users can only upload one file
    return unauthorizedUserChat(req, fileName);
  } catch (error) {
    return NextResponse.error();
  }
}

const authorizedUserChat = async (userId: string, fileName: string) => {
  const chatData = await getChatByUserIdAndFileName(userId, fileName);

  if (!chatData || chatData.length === 0) {
    return NextResponse.json(
      { success: true, message: 'No data found' },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, chats: chatData }, { status: 200 });
};

const unauthorizedUserChat = async (req: NextRequest, fileName: string) => {
  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? '';

  const chatData = await getChatByIPAndFileName(ip);

  if (!chatData || chatData.length === 0) {
    return NextResponse.json(
      { success: true, message: 'No data found' },
      { status: 200 }
    );
  }

  // If the unauthorized user has already uploaded a file with the same name return the chat data, otherwise return error
  if (chatData[0].pdf_file_name !== fileName) {
    return NextResponse.json(
      {
        success: true,
        message:
          'Limited of files reached, please if you want to upload more files signup in the platform',
        chats: chatData,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, chats: chatData }, { status: 200 });
};
