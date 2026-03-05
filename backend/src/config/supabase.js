import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

let supabase = null

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here') {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase client initialized')
} else {
    console.warn('⚠️  Supabase credentials not configured – using mock data')
}

export default supabase
