import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Screenshot {
  id: number;
  customer_email: string;
  order_details: string;
  file_name: string;
  file_size: number;
  status: string;
  created_at: string;
}

export function useScreenshots() {
  const { user } = useAuth();
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) {
      setScreenshots([]);
      return;
    }

    const fetchScreenshots = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: queryError } = await supabase
          .from('screenshot_submissions')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false });

        if (queryError) throw queryError;
        setScreenshots(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load screenshots');
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, [user?.email]);

  return { screenshots, loading, error };
}
