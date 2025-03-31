/*
  # Blog Posts Table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `category` (text)
      - `author` (text)
      - `read_time` (text)
      - `image_url` (text)
      - `tags` (text[])
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create blog_posts table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts'
  ) THEN
    CREATE TABLE blog_posts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      content text NOT NULL,
      excerpt text,
      category text NOT NULL,
      author text NOT NULL,
      read_time text NOT NULL,
      image_url text,
      tags text[],
      created_by uuid REFERENCES auth.users NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

    -- Create policies for blog_posts table
    CREATE POLICY "Public can read blog posts"
      ON blog_posts
      FOR SELECT
      TO public
      USING (true);

    CREATE POLICY "Only admins can insert blog posts"
      ON blog_posts
      FOR INSERT
      TO authenticated
      WITH CHECK (is_admin(auth.uid()));

    CREATE POLICY "Only admins can update blog posts"
      ON blog_posts
      FOR UPDATE
      TO authenticated
      USING (is_admin(auth.uid()))
      WITH CHECK (is_admin(auth.uid()));

    CREATE POLICY "Only admins can delete blog posts"
      ON blog_posts
      FOR DELETE
      TO authenticated
      USING (is_admin(auth.uid()));
  END IF;
END $$;

-- Create storage bucket for blog images if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'blog-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('blog-images', 'blog-images', true);

    -- Create policies for blog images storage
    CREATE POLICY "Public can read blog images"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'blog-images');

    CREATE POLICY "Only admins can upload blog images"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'blog-images' 
        AND is_admin(auth.uid())
      );

    CREATE POLICY "Only admins can update blog images"
      ON storage.objects
      FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'blog-images' 
        AND is_admin(auth.uid())
      );

    CREATE POLICY "Only admins can delete blog images"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (
        bucket_id = 'blog-images' 
        AND is_admin(auth.uid())
      );
  END IF;
END $$;

-- Create trigger to automatically update updated_at if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_blog_posts_updated_at'
  ) THEN
    CREATE TRIGGER update_blog_posts_updated_at
      BEFORE UPDATE ON blog_posts
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;