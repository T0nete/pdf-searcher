import { OpenAIEmbeddings } from '@langchain/openai';

export const getEmbeddings = async (content: string) => {
  const openAiEmbeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  // Even though embeddings is a matrix, we only need the first row, so we are only passing the first document
  const embeddings = await openAiEmbeddings.embedDocuments([content]);

  return embeddings[0];
};
