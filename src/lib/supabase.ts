import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

// Check for both keys
if (!process.env.SUPABASE_URL) {
  throw new Error("Please set SUPABASE_URL environment variable.");
}

// For read operations, use anon key
const readClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || ''
);

// For write operations that require bypassing RLS, use service role key
const writeClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: false, // Important for server-side operations
    }
  }
);

// Function to get a vector store instance from an existing index
export async function getVectorStore() {
  return new SupabaseVectorStore(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }), 
    {
      client: readClient, // Use read client for queries
      tableName: 'documents',
      queryName: 'match_documents',
      filter: {},
    }
  );
}

// Function for vector store operations that need write access (adding documents)
export async function getWriteVectorStore() {
  return new SupabaseVectorStore(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }), 
    {
      client: writeClient, // Use write client with service role key
      tableName: 'documents',
      queryName: 'match_documents',
      filter: {},
    }
  );
}

// Function to get a reference to the embeddings collection
export async function getEmbeddingsCollection() {
  return writeClient.from('documents'); // Use write client for document operations
}
