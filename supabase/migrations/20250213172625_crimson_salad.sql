/*
  # Fix policies with explicit column references

  1. Changes
    - Drop and recreate policies with fully qualified column references
    - Fix ambiguous user_id references in policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can delete blog posts" ON blog_posts;

-- Recreate policies with fully qualified column references
CREATE POLICY "Public can read blog posts"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can insert blog posts"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update blog posts"
ON blog_posts FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can delete blog posts"
ON blog_posts FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);