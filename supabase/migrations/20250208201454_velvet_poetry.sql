/*
  # Add Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `brand` (text)
      - `features` (text[])
      - `tags` (text[])
      - `rating` (integer)
      - `reviews` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  price numeric(10,2),
  image_url text,
  brand text,
  features text[],
  tags text[],
  rating integer,
  reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create policies for products table
CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));

-- Create policies for product images storage
CREATE POLICY "Public can read product images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

CREATE POLICY "Only admins can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' 
    AND is_admin(auth.uid())
  );

CREATE POLICY "Only admins can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND is_admin(auth.uid())
  );

CREATE POLICY "Only admins can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND is_admin(auth.uid())
  );

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();