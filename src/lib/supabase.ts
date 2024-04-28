import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadFileToBucket = async (file: File) => {
  try {
    const { data, error } = await supabaseClient.storage
      .from('pdf')
      .upload(file.name, file);

    if (error) {
      console.error('Error uploading file: ', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Unexpected Error uploading file: ', error);
    let errorMessage = 'An error occurred while uploading the file';
    throw new Error(errorMessage);
  }
};
