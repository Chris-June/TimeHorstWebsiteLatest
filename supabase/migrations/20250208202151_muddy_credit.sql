/*
  # Create Portfolio Projects Table

  1. New Tables
    - `portfolio_projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `location` (text)
      - `date` (text)
      - `status` (text)
      - `details` (text[])
      - `before_image_url` (text)
      - `after_image_url` (text)
      - `testimonial_content` (text)
      - `testimonial_author` (text)
      - `testimonial_role` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `portfolio_projects` table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  location text NOT NULL,
  date text NOT NULL,
  status text NOT NULL,
  details text[],
  before_image_url text,
  after_image_url text NOT NULL,
  testimonial_content text,
  testimonial_author text,
  testimonial_role text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for portfolio images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'portfolio-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('portfolio-images', 'portfolio-images', true);
  END IF;
END $$;

-- Create policies for portfolio_projects table
CREATE POLICY "Public can read portfolio projects"
  ON portfolio_projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert portfolio projects"
  ON portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update portfolio projects"
  ON portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete portfolio projects"
  ON portfolio_projects
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));

-- Create policies for portfolio images storage
CREATE POLICY "Public can read portfolio images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Only admins can upload portfolio images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-images' 
    AND is_admin(auth.uid())
  );

CREATE POLICY "Only admins can update portfolio images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images' 
    AND is_admin(auth.uid())
  );

CREATE POLICY "Only admins can delete portfolio images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images' 
    AND is_admin(auth.uid())
  );

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();