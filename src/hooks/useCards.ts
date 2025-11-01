import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Card {
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

export function useCards(searchTerm: string, selectedCountry: string, sortBy: string) {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCards()
  }, [searchTerm, selectedCountry, sortBy])

  const fetchCards = async () => {
    try {
      setLoading(true)
      setError(null)

      // Use direct Supabase query instead of Edge Function
      let query = supabase
        .from('cards')
        .select('*')
        .eq('is_available', true)

      // Apply filters
      if (selectedCountry && selectedCountry !== 'all') {
        query = query.eq('country', selectedCountry)
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true })
          break
        case 'price-high':
          query = query.order('price', { ascending: false })
          break
        case 'balance':
          query = query.order('balance', { ascending: false })
          break
        case 'rating':
          query = query.order('rating', { ascending: false })
          break
        default:
          query = query.order('title', { ascending: true })
      }

      const { data, error: queryError } = await query

      if (queryError) {
        throw queryError
      }

      setCards(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards')
      console.error('Error fetching cards:', err)
    } finally {
      setLoading(false)
    }
  }

  return { cards, loading, error, refetch: fetchCards }
}