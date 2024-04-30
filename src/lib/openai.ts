import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

export const getEmbeddings = async (document: Document) => {
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  return await embeddings.embedDocuments([document.pageContent]);
};
