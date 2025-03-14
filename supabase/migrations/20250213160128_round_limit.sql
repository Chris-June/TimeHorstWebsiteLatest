/*
  # Add in_stock column to products table

  1. Changes
    - Add in_stock column to products table with default value true
    - Add missing columns for product variants and tags
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add in_stock column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'in_stock'
  ) THEN
    ALTER TABLE products ADD COLUMN in_stock boolean DEFAULT true;
  END IF;
END $$;

-- Add variants column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'variants'
  ) THEN
    ALTER TABLE products ADD COLUMN variants jsonb[];
  END IF;
END $$;

-- Add tags column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'tags'
  ) THEN
    ALTER TABLE products ADD COLUMN tags text[];
  END IF;
END $$;