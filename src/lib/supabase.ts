import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

// Flag to check if we have necessary credentials
const hasSupabaseCredentials = 
  typeof process.env.SUPABASE_URL === 'string' && 
  process.env.SUPABASE_URL.length > 0;

// For read operations, use anon key
const readClient = hasSupabaseCredentials ? createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
) : null;

// For write operations that require bypassing RLS, use service role key
const writeClient = hasSupabaseCredentials ? createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: false, // Important for server-side operations
    }
  }
) : null;

// Function to get a vector store instance from an existing index
export async function getVectorStore() {
  if (!hasSupabaseCredentials) {
    throw new Error("Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.");
  }
  
  return new SupabaseVectorStore(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }), 
    {
      client: readClient!, // Use read client for queries
      tableName: 'documents',
      queryName: 'match_documents',
      filter: {},
    }
  );
}

// Function for vector store operations that need write access (adding documents)
export async function getWriteVectorStore() {
  if (!hasSupabaseCredentials) {
    throw new Error("Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }
  
  return new SupabaseVectorStore(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }), 
    {
      client: writeClient!, // Use write client with service role key
      tableName: 'documents',
      queryName: 'match_documents',
      filter: {},
    }
  );
}

// Function to get a reference to the embeddings collection
export async function getEmbeddingsCollection() {
  if (!hasSupabaseCredentials) {
    throw new Error("Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.");
  }
  
  return writeClient!.from('documents'); // Use write client for document operations
}
