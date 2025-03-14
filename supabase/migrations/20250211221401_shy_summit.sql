/*
  # Add username to admin_users table

  1. Changes
    - Add username column to admin_users table
    - Set unique usernames for existing admin users
    - Make username required for future records

  2. Notes
    - Handles existing records carefully to avoid duplicates
    - Uses email prefix + random suffix for uniqueness
*/

DO $$ 
BEGIN
  -- First add the column as nullable
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'admin_users' AND column_name = 'username'
  ) THEN
    ALTER TABLE admin_users ADD COLUMN username text;
    
    -- Update existing records one by one with unique usernames
    UPDATE admin_users 
    SET username = CASE 
      WHEN email = 'intellisync@admin.timhorst.com' THEN 'intellisync_admin'
      WHEN email = 'TimHorst@admin.timhorst.com' THEN 'TimHorst_admin'
      ELSE SPLIT_PART(email, '@', 1) || '_' || SUBSTR(MD5(RANDOM()::text), 1, 4)
    END;
    
    -- Now add the unique constraint and not null constraint
    ALTER TABLE admin_users 
      ALTER COLUMN username SET NOT NULL,
      ADD CONSTRAINT admin_users_username_key UNIQUE (username);
  END IF;
END $$;