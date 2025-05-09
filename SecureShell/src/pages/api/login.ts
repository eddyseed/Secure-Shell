import type { NextApiRequest, NextApiResponse } from 'next'
import supabaseClient from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body
  console.log("Received login request:", { email, password })

  if (!email || !password) {
    console.log("Missing email or password")
    return res.status(400).json({ error: 'Missing email or password' })
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    console.log("Supabase login result:", { data, error })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    return res.status(200).json({ message: 'User logged in successfully', user: data })
  } catch (err) {
    console.error("Unexpected server error:", err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
