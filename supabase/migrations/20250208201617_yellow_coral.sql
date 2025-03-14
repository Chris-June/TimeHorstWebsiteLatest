/*
  # Update Products Table

  1. Changes
    - Add created_by column to products table
    - Add foreign key constraint to auth.users
    - Update existing policies to use created_by

  Note: This migration assumes the products table and its basic policies already exist
*/

-- Add created_by column to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

-- Recreate policies with created_by field
CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin(auth.uid()) AND 
    created_by = auth.uid()
  );

CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    is_admin(auth.uid()) AND 
    created_by = auth.uid()
  )
  WITH CHECK (
    is_admin(auth.uid()) AND 
    created_by = auth.uid()
  );

CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (
    is_admin(auth.uid()) AND 
    created_by = auth.uid()
  );