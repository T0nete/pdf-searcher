import { Metadata } from 'langchain/vectorstores/singlestore';
import { convertToAscii } from '../utils';
import { getPineConeClient } from './pinecone-client';
import { getEmbeddings } from '@/lib/openai/openai-embeddings';

export const getMatchesFromEmbeddings = async (
  fileName: string,
  embeddings: number[]
) => {
  try {
    const pinecone = getPineConeClient();

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
    const pineconeNamespace = pineconeIndex.namespace(convertToAscii(fileName));

    console.log('Querying Pinecone...');
    const pineconeQueryResult = await pineconeNamespace.query({
      topK: 5, // Get the top 5 matches
      includeMetadata: true,
      vector: embeddings,
    });

    return pineconeQueryResult.matches;
  } catch (error) {
    console.error('Error in getMatchesFromEmbeddings', error);
  }
};

export const getContext = async (message: string, fileName: string) => {
  console.log('Get context: ', message, fileName);
  const queryEmbeddings = await getEmbeddings(message);

  const matches = await getMatchesFromEmbeddings(fileName, queryEmbeddings);

  const qualifyingDocs = matches?.filter(
    (match) => match.score && match.score > 0.7
  );

  let docs = qualifyingDocs
    ? qualifyingDocs.map((match) => (match.metadata as Metadata).text)
    : [];

  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join('\n').substring(0, 3000);
};
