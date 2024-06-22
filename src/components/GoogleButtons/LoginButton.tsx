import React from 'react';
import Google from '@/components/icons/Google';
import { supabaseClient } from '@/lib/supabase/browserClient';
import { toast } from 'react-toastify';

type Props = {
  currentChatId: string | undefined;
  isDisabled?: boolean;
};

const LoginButton = (props: Props) => {
  const handleLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/chat/${props.currentChatId}`,
      },
    });

    if (error) {
      toast.error(`Error logging in: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="py-2 px-4 flex flex-row rounded-md w-full items-center justify-center text-white   bg-brand-orange hover:bg-brand-orange-hover duration-200 transition-colors"
      disabled={props.isDisabled}
    >
      <Google />
      <p>Sign in with Google</p>
    </button>
  );
};

export default LoginButton;
