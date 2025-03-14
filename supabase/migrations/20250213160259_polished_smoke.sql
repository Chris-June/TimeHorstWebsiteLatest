/*
  # Fix ambiguous column references in RLS policies

  1. Changes
    - Drop and recreate RLS policies with fully qualified column references
    - Maintain existing security model and access control
  
  2. Security
    - Policies ensure proper access control for authenticated users
    - Maintain data isolation between users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

-- Recreate policies with fully qualified column references
CREATE POLICY "Public can read products"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update products"
ON products FOR UPDATE
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

CREATE POLICY "Only admins can delete products"
ON products FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);