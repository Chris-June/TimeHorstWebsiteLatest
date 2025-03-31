/*
  # Add Second Admin User

  1. Changes
    - Adds a new admin user with specified credentials
    - Adds corresponding entry in admin_users table

  2. Security
    - Password is securely hashed using bcrypt
    - User is properly linked to admin_users table
*/

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
    'TimHorst@admin.timhorst.com',
    crypt('#Tim#Horst$', gen_salt('bf')),
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
  VALUES (admin_id, 'TimHorst@admin.timhorst.com');
END $$;