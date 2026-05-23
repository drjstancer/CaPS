import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL environment variable.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export async function getCurrentSession() {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Session lookup error:', error.message);
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error('User lookup error:', error.message);
    return null;
  }

  return user;
}

export async function signInWithEmail(
  email: string,
  password: string
) {
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOutUser() {
  return supabase.auth.signOut();
}

export async function fetchUserRole(userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role_name')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Role lookup error:', error.message);
    return null;
  }

  return data?.role_name ?? null;
}
