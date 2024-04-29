import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadFileToBucket = async (file: File) => {
  try {
    const { error } = await supabaseClient.storage
      .from('pdf')
      .update(file.name, file);

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

export const downloadFileFromBucket = async (fileName: string) => {
  try {
    const { data, error } = await supabaseClient.storage
      .from('pdf')
      .download(fileName);

    if (error) {
      console.error('Error downloading file: ', error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Unexpected Error downloading file: ', error);
    let errorMessage = 'An error occurred while downloading the file';
    throw new Error(errorMessage);
  }
};
