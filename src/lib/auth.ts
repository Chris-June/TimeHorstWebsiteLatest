import { supabase } from './supabase';

export type User = {
  id: string;
  username: string;
  isAdmin: boolean;
};

export async function signIn(identifier: string, password: string) {
  // Check if the identifier is an email
  const isEmail = identifier.includes('@');
  const email = isEmail ? identifier : `${identifier}@admin.timhorst.com`;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Check if user is admin by querying the admin_users table
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('username, email')
    .eq('user_id', data.user.id)
    .single();

  if (adminError) throw adminError;

  return {
    id: data.user.id,
    username: adminData.username || identifier,
    isAdmin: !!adminData,
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  if (error) throw error;
}