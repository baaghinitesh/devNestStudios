import { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { testimonialsAPI } from '../services/api';

export const useTestimonials = (params?: { featured?: boolean; limit?: number }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('🔄 Fetching testimonials with params:', params);
        setLoading(true);
        setError(null);
        const response = await testimonialsAPI.getAll(params);
        console.log('✅ Testimonials fetched successfully:', response.data?.length, 'items');
        setTestimonials(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching testimonials:', {
          message: err.message,
          status: err.response?.status,
          url: err.config?.url,
          params
        });
        setError(err.response?.data?.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.featured, params?.limit]);

  return { testimonials, loading, error };
};