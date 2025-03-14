/*
  # Fix storage policies for objects table

  1. Changes
    - Drop existing storage policies
    - Recreate policies with unambiguous column references
    - Add proper RLS policies for each bucket

  2. Notes
    - Uses explicit schema references to avoid ambiguity
    - Ensures proper access control for each bucket
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete blog images" ON storage.objects;

DROP POLICY IF EXISTS "Public can read portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete portfolio images" ON storage.objects;

DROP POLICY IF EXISTS "Public can read product images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete product images" ON storage.objects;

-- Recreate policies with explicit schema references
CREATE POLICY "Public can read blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "Only admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

-- Portfolio image policies
CREATE POLICY "Public can read portfolio images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Only admins can upload portfolio images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update portfolio images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portfolio-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can delete portfolio images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

-- Product image policies
CREATE POLICY "Public can read product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "Only admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE public.admin_users.user_id = auth.uid()
  )
);