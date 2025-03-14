/*
  # Fix ambiguous user_id references

  1. Changes
    - Update policies to use fully qualified column references
    - Fix ambiguous user_id references in portfolio_projects table
    - Ensure consistent policy naming and structure
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read portfolio projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Only admins can insert portfolio projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Only admins can update portfolio projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Only admins can delete portfolio projects" ON portfolio_projects;

-- Recreate policies with fully qualified column references
CREATE POLICY "Public can read portfolio projects"
ON portfolio_projects FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can insert portfolio projects"
ON portfolio_projects FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Only admins can update portfolio projects"
ON portfolio_projects FOR UPDATE
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

CREATE POLICY "Only admins can delete portfolio projects"
ON portfolio_projects FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);