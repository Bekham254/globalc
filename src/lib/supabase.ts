import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
      cards: {
        Row: {
          id: number
          title: string
          description: string
          price: number
          balance: number
          card_type: string
          card_color: string
          rating: number
          country: string
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          price: number
          balance: number
          card_type: string
          card_color: string
          rating: number
          country: string
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          price?: number
          balance?: number
          card_type?: string
          card_color?: string
          rating?: number
          country?: string
          is_available?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          card_id: number
          amount: number
          payment_method: string
          payment_status: string
          screenshot_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          card_id: number
          amount: number
          payment_method: string
          payment_status?: string
          screenshot_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          card_id?: number
          amount?: number
          payment_method?: string
          payment_status?: string
          screenshot_url?: string | null
          created_at?: string
        }
      }
    }
  }
}