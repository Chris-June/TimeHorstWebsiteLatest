/*
  # Update Auth Login to Support Username or Email

  1. Changes
    - Adds a username column to admin_users table
    - Updates existing records with unique usernames
    - Ensures both email and username can be used for login

  2. Security
    - Maintains existing RLS policies
    - Ensures unique usernames
*/

-- Add username column to admin_users if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'admin_users' AND column_name = 'username'
  ) THEN
    -- First add the column as nullable
    ALTER TABLE admin_users ADD COLUMN username text;
    
    -- Update existing records one by one with unique usernames
    UPDATE admin_users 
    SET username = CASE 
      WHEN email = 'intellisync@admin.timhorst.com' THEN 'intellisync'
      WHEN email = 'TimHorst@admin.timhorst.com' THEN 'TimHorst'
      ELSE SPLIT_PART(email, '@', 1) || '_' || SUBSTR(MD5(RANDOM()::text), 1, 4)
    END;
    
    -- Now add the unique constraint and not null constraint
    ALTER TABLE admin_users 
      ALTER COLUMN username SET NOT NULL,
      ADD CONSTRAINT admin_users_username_key UNIQUE (username);
  END IF;
END $$;