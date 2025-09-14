import { useState, useEffect } from 'react';
import { Service } from '../types';
import { servicesAPI } from '../services/api';

export const useServices = (params?: { category?: string; featured?: boolean }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('🔄 Fetching services with params:', params);
        setLoading(true);
        setError(null);
        const response = await servicesAPI.getAll(params);
        console.log('✅ Services fetched successfully:', response.data?.length, 'items');
        setServices(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching services:', {
          message: err.message,
          status: err.response?.status,
          url: err.config?.url,
          params
        });
        setError(err.response?.data?.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.category, params?.featured]);

  return { services, loading, error };
};

export const useService = (slug: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesAPI.getBySlug(slug);
        setService(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch service');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  return { service, loading, error };
};