import { supabaseClient } from './browserClient';

export const uploadFileToBucket = async (file: File, fileName: string) => {
  try {
    console.log('uploadFileToBucket');
    const { error } = await supabaseClient.storage
      .from('pdf')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file: ', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Unexpected Error uploading file: ', error);
    let errorMessage = 'An error occurred while uploading the file';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
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

export const getPublicUrl = (fileName: string) => {
  return supabaseClient.storage.from('pdf').getPublicUrl(fileName);
};
