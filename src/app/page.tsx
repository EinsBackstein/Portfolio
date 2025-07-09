import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import DotGrid from '@/components/DotGrid';

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DotGrid darkMode={true} />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex place-items-center gap-2">
          <p>My Portfolio Site</p>
        </div>
      </div>
    </main>
  );
}

