/*
  # Create Admin User

  1. New Tables
    - No new tables created
  2. Security
    - Creates admin user with specified credentials
  3. Changes
    - Inserts admin user into auth.users
    - Adds admin user to admin_users table
*/

-- Create admin user with secure password
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Create user in auth.users table with secure password
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'intellisync@admin.timhorst.com',
    crypt('Courtney#1', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO admin_id;

  -- Add user to admin_users table
  INSERT INTO admin_users (user_id, email)
  VALUES (admin_id, 'intellisync@admin.timhorst.com');
END $$;