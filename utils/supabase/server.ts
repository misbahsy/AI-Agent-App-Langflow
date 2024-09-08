import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        getAll() {
          return cookieStore.getAll().reduce((acc, cookie) => {
            acc[cookie.name] = cookie.value;
            return acc;
          }, {} as Record<string, string>);
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        setAll(cookies: Record<string, string>) {
          for (const [name, value] of Object.entries(cookies)) {
            cookieStore.set({ name, value });
          }
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};
