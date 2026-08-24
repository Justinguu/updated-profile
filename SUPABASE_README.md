# Supabase AI Assistant Setup Guide

This guide will help you properly set up Supabase vector store for the AI assistant feature.

## Required Environment Variables

Add these variables to your `.env.local` file:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## How to get your Supabase credentials

1. Go to your Supabase dashboard
2. Select your project
3. Go to Project Settings > API
4. You will find these credentials:
   - Project URL = `SUPABASE_URL`
   - Project API Keys:
     - `anon` `public` = `SUPABASE_ANON_KEY`
     - `service_role` = `SUPABASE_SERVICE_ROLE_KEY` (keep this secret, server-side only)

## Importance of Service Role Key

The `SUPABASE_SERVICE_ROLE_KEY` is required for operations that need to bypass Row Level Security (RLS) policies, such as:
- Adding documents to the vector store
- Deleting documents from the vector store

The typical error when not using the service role key is:
```
Error inserting: new row violates row-level security policy for table "documents" 401 Unauthorized
```

## Setting up the Supabase database

1. Create a new table called `documents` with the following schema:
   - `id` (int8, primary key)
   - `content` (text)
   - `metadata` (jsonb)
   - `embedding` (vector)

2. Create the matching function for similarity search:
```sql
create or replace function match_documents (
  query_embedding vector,
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
```

## Generating Embeddings

After setting up your environment variables and database, run:

```bash
npm run generate-embeddings
```

This will:
1. Clear existing documents in the vector store
2. Load resume data from JSON
3. Process and split the documents
4. Generate embeddings and store them in Supabase

## Troubleshooting

If you're getting RLS policy errors even with the service role key:

1. Check that your `.env.local` file has the correct `SUPABASE_SERVICE_ROLE_KEY`
2. Verify that the key has been properly loaded (try logging `process.env.SUPABASE_SERVICE_ROLE_KEY` to check)
3. Make sure you're running the script with the corrected code that uses `getWriteVectorStore()` 