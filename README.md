# PDF Searcher AI

[PDF Searcher AI](https://pdf-searcher-ai.vercel.app) is a web application that allows users to upload a PDF and ask questions related to the content of the uploaded PDF. The app uses a chatbot to provide answers based on the PDF content. This project is built using Next.js with TypeScript and is hosted on Vercel.

## Features

- Upload a PDF file
- Ask questions related to the PDF content
- Get accurate answers based on the uploaded PDF

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwindcss
- **Hosting:** Vercel
- **File Storage:** Supabase (S3-compatible storage)
- **Database:** Supabase
- **Authentication:** Google Authentication via Supabase
- **Vector Storage:** Pinecone
- **AI Model:** OpenAI's ChatGPT API

## How It Works

1. **File Upload:**
   - The user uploads a PDF file through the web interface.
   - The PDF file is stored in Supabase's S3-compatible storage.

2. **PDF Processing:**
   - The PDF is divided into chunks to facilitate text processing.
   - Each chunk of text is vectorized using OpenAI's embedding model.

3. **Vector Storage:**
   - The vectorized chunks are stored in Pinecone, a vector database designed for similarity search.

4. **Question Answering:**
   - When a user asks a question, the query is vectorized using the same embedding model.
   - The vectorized query is matched against the stored vectors in Pinecone to find the most relevant chunks.
   - The content of the most relevant chunks is used to generate a response via OpenAI's ChatGPT API.

## Getting Started

Follow these instructions to set up and run the project locally.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
