import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { downloadFileFromBucket } from './supabase';

export const getPineConeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

export const uploadFileToPinecone = async (fileName: string) => {
  try {
    // 1. Download the file from the Supabase Storage
    let blobFile: Blob | null = null;
    try {
      blobFile = await downloadFileFromBucket(fileName);
    } catch (error) {
      console.error(error);
      return;
    }

    // 2. Divide the file by pages
    const loader = new PDFLoader(blobFile);
    console.log('loader', loader);
    const docs = await loader.load();
    console.log('docs', docs);

    // 3. Split the pages into smaller chunks
    // 4. Create the vector embeddings for each chunk
    // 5. Truncate the vector embeddings to fit with Pinecone's maximum size
    // 6. Upload the vector embeddings to Pinecone
  } catch (error) {
    console.error('Unexpected Error uploading file: ', error);
  }
};
