/*
  # Add read_time column to blog_posts table

  1. Changes
    - Add read_time column to blog_posts table
    - Rename existing readTime references to read_time for consistency
*/

-- Add read_time column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'read_time'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN read_time text;
  END IF;
END $$;