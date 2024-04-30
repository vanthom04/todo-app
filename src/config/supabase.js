import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const TABLE_NAME = 'todo_list'

export const supabase = createClient(supabaseUrl, supabaseKey)
