'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ShimmeringButton from './ShimmeringButton'

export default function LogoutButton({ className = '' }: { className?: string }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <ShimmeringButton
      className={className}
      onClick={handleLogout}
    >
      Logout
    </ShimmeringButton>
  )
}