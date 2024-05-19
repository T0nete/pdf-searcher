'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: userData, error } =
    await createClient().auth.signInWithPassword(data);
  console.log(userData);

  if (error) {
    console.error(error);
    redirect('/');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await createClient().auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
