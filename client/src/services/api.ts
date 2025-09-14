import axios from 'axios';
import { Service, Testimonial, Project, ContactForm, BlogPost } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout to handle MongoDB fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      baseURL: error.config?.baseURL
    });
    return Promise.reject(error);
  }
);

// Services API
export const servicesAPI = {
  getAll: (params?: { category?: string; featured?: boolean }) => 
    api.get<Service[]>('/services', { params }),
  
  getBySlug: (slug: string) => 
    api.get<Service>(`/services/${slug}`),
  
  getCategories: () => 
    api.get<string[]>('/services/categories/all'),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params?: { featured?: boolean; limit?: number }) => 
    api.get<Testimonial[]>('/testimonials', { params }),
  
  getById: (id: string) => 
    api.get<Testimonial>(`/testimonials/${id}`),
};

// Projects API
export const projectsAPI = {
  getAll: (params?: { featured?: boolean; industry?: string; limit?: number }) => 
    api.get<Project[]>('/projects', { params }),
  
  getBySlug: (slug: string) => 
    api.get<Project>(`/projects/${slug}`),
};

// Contact API
export const contactAPI = {
  submit: (data: ContactForm) => 
    api.post('/contact', data),
  
  getAll: (params?: { status?: string; limit?: number }) => 
    api.get<ContactForm[]>('/contact', { params }),
};

// Blog API
export const blogAPI = {
  getAll: (params?: { featured?: boolean; category?: string; limit?: number }) => 
    api.get<BlogPost[]>('/blog', { params }),
  
  getBySlug: (slug: string) => 
    api.get<BlogPost>(`/blog/${slug}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;