import { createClient } from '@/lib/supabase/serverClient';
import { updateChatWithUserIdById } from '@/lib/supabase/supabase-chats';
import { createUser, getUserById } from '@/lib/supabase/supabase-users';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');

  // if "next" is in param, use it in the redirect URL
  const next = searchParams.get('next') ?? '/';

  console.log('GET /auth/callback', searchParams, origin);
  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Validate if the user already exists, if existst log him in
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const user = data.user;
        // If the user is the first time signing in, create a new user in the database
        const existingUser = await getUserById(user.id);
        console.log('Existing user', existingUser);
        if (!existingUser) {
          // Create a new user
          console.log('Creating a new user', user.id, user.email);
          const newUser = await createUser({
            id: user.id,
            email: user.email ?? '',
            display_name: '',
          });

          if (!newUser) {
            console.error('Error creating user provided by Google', user.id);
          }

          // Update the chat with the user_id by ip or by chatId
          // next = /chats/chatId
          const chatId = next.split('/').pop();
          if (chatId) await updateChatWithUserIdById(chatId, user.id);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // TODO: Create this page
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
