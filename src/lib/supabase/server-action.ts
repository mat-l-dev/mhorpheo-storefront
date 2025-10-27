import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

export const createServerActionClient = async () => {
  return await createClient()
}
