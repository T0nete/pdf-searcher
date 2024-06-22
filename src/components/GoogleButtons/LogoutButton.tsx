'use client';

import React from 'react';
import { toast } from 'react-toastify';
import Logout from '@/components/icons/Logout';
import { supabaseClient } from '@/lib/supabase/browserClient';
import { useRouter } from 'next/navigation';

type Props = {
  isDisabled?: boolean;
};

const Logoutbutton = (props: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(`Error logging out: ${error.message}`);
    }

    console.log('Logged out')
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 flex flex-row rounded-md w-full items-center justify-center text-white bg-brand-orange hover:bg-brand-orange-hover duration-200 transition-colors"
      disabled={props.isDisabled}
    >
      <Logout />
      <p>Sign Out</p>
    </button>
  );
};

export default Logoutbutton;
