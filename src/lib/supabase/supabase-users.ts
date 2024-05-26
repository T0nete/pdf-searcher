import { createClient } from '@/lib/supabase/serverClient';

export const getUserById = async (id: string) => {
  const { data, error } = await createClient()
    .from('user')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user by id', error);
    return null;
  }

  return data;
};

interface ICreateUser {
  id: string;
  email: string;
  display_name: string;
}
export const createUser = async (user: ICreateUser) => {
  const { error } = await createClient().from('user').insert({
    id: user.id,
    email: user.email,
    display_name: user.display_name,
  });

  if (error) {
    console.error('Error creating user', error);
    return null;
  }

  return user;
};
