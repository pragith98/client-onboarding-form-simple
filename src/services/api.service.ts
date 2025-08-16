/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

interface ApiError {
  message:  any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_ONBOARD_URL ?? '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const api = {
  get: async <T = unknown>(url: string, params?: Record<string, unknown>) => {
    try {
      const response = await apiClient.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async <T = unknown>(url: string, data?: unknown): Promise<T> => {
    try {
      const response = await apiClient.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  put: async <T = unknown>(url: string, data?: unknown): Promise<T> => {
    try {
      const response = await apiClient.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async <T = unknown>(url: string, params?: unknown): Promise<T> => {
    try {
      const response = await apiClient.delete<T>(url, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || 'An error occurred while processing your request.'
    };
  }
  return {
    message: 'An unexpected error occurred.'
  };
};