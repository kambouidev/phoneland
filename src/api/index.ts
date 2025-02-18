import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
});

interface QueryParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export const getApi = async <T>(endpoint: string, params?: QueryParams): Promise<T> => {
  try {
    const { data } = await axiosInstance.get<T>(endpoint, {
      params: {
        ...(params?.search && { search: params.search }),
        ...(params?.limit && { limit: params.limit }),
        ...(params?.offset && { offset: params.offset }),
      },
    });
    return data;
  } catch (error) {
    console.error('Error in getApi:', error);
    throw error;
  }
};

export default axiosInstance;
