'use client'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { supabase } from '@/lib/supabase'

export function OAuthButtons() {
  const loginWith = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full" onClick={() => loginWith('google')}>
        <FcGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="w-full" onClick={() => loginWith('github')}>
        <FaGithub className="mr-2 h-5 w-5" />
        Continue with GitHub
      </Button>
    </div>
  )
}
