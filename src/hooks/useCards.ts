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

      const params = new URLSearchParams()
      if (selectedCountry !== 'all') params.append('country', selectedCountry)
      if (searchTerm) params.append('search', searchTerm)
      if (sortBy) params.append('sortBy', sortBy)

      const { data, error } = await supabase.functions.invoke('get-cards', {
        method: 'GET',
      })

      if (error) throw error

      setCards(data.cards || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards')
      console.error('Error fetching cards:', err)
    } finally {
      setLoading(false)
    }
  }

  return { cards, loading, error, refetch: fetchCards }
}