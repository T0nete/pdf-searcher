import MainContentWrapper from '@/components/MainContentWrapper';
import { createClient } from '@/lib/supabase/serverClient';
import { getChatsByIp, getChatsByUserId } from '@/lib/supabase/supabase-chats';
import { headers } from 'next/headers';
import { Chat } from 'openai/resources/index.mjs';

type Props = {}

const DefaultChatPage = async (props: Props) => {
    const user = await createClient().auth.getUser();
    let _chatList: Chat[] | null = null;

    if (user.data?.user?.id) {
        _chatList = await getChatsByUserId(user.data.user?.id) as Chat[] | null;
    } else {
        const ip =
            headers().get('x-real-ip') ||
            headers().get('x-forwarded-for') ||
            headers().get('x-real-ip');

        if (!ip) {
            console.error('Error getting ip');
            return null;
        }
        _chatList = await getChatsByIp(ip) as Chat[] | null;
    }


    return (
        <div className="flex flex-1 h-full relative overflow-hidden gap-2">
            <MainContentWrapper
                chatList={_chatList}
            />
        </div>
    )
}

export default DefaultChatPage