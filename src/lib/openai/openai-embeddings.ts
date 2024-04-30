import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeRecord } from '@pinecone-database/pinecone';

export const getEmbeddings = async (document: Document) => {
  const openAiEmbeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  // Even though embeddings is a matrix, we only need the first row, so we are only passing the first document
  const embeddings = await openAiEmbeddings.embedDocuments([
    document.pageContent,
  ]);

  // To store the embeddings in Pinecone, we need to convert them to a PineconeRecord
  const pineconeId = Math.random().toString(36).substring(7);
  const {
    loc: { pageNumber },
    text,
  } = document.metadata;

  return {
    id: pineconeId,
    values: embeddings[0],
    metadata: {
      pageNumber,
      text,
    },
  } as PineconeRecord;
};
