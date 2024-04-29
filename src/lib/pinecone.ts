import { downloadFileFromBucket } from './supabase';
import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { truncate } from 'fs';

export const getPineConeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    source: string;
    blobType: string;
    loc: { pageNumber: 1 };
  };
};
export const uploadFileToPinecone = async (fileName: string) => {
  try {
    console.log('Uploading file to Pinecone');
    // 1. Download the file from the Supabase Storage
    let blobFile: Blob | null = null;
    try {
      blobFile = await downloadFileFromBucket(fileName);
    } catch (error) {
      console.error(error);
      return;
    }

    // 2. Read pdf data and divide it by pages
    console.log('Loading PDF file...');
    const loader = new PDFLoader(blobFile);
    const pdfPages: PDFPage[] = (await loader.load()) as PDFPage[];

    // 3. Split the pages into smaller chunks
    const splitedDocument = await Promise.all(
      pdfPages.map((pdf) => prepareDocument(pdf))
    );
    console.log(splitedDocument);

    // 4. Create the vector embeddings for each chunk
    // 5. Truncate the vector embeddings to fit with Pinecone's maximum size
    // 6. Upload the vector embeddings to Pinecone
  } catch (error) {
    console.error('Unexpected Error uploading file: ', error);
  }
};

const prepareDocument = async (page: PDFPage) => {
  const splitter = new RecursiveCharacterTextSplitter();
  const document = new Document({
    pageContent: page.pageContent,
    metadata: {
      pageNumber: page.metadata.loc.pageNumber,
    },
  });
  const docs = await splitter.splitDocuments([document]);
  return docs;
};
