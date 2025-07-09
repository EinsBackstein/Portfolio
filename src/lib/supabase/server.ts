import { createServerClient, type CookieOptions } from '@supabase/ssr';

export const createClient = (cookieStore: unknown) => {
  if (typeof (cookieStore as any)?.then === 'function') {
    throw new Error(
      'You must pass the resolved value of cookies() (i.e., await cookies()) to createClient. See https://nextjs.org/docs/messages/sync-dynamic-apis'
    );
  }
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          
          return (cookieStore as any).get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            
            (cookieStore as any).set({ name, value, ...options });
          } catch {
            // Ignore errors from set in server components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
           
            (cookieStore as any).set({ name, value: '', ...options });
          } catch {
            // Ignore errors from set in server components
          }
        },
      },
    }
  );
};
