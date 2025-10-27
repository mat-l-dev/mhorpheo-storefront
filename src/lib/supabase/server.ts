import { cookies } from 'next/headers'
import { createServerClient } from './client'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(cookieStore)
}
