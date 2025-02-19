import { useQuery } from '@tanstack/react-query';
import { getApi } from '@/api';
import { IDeviceDetails } from '@/types';

export const useGetDeviceDetails = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: () => getApi<IDeviceDetails>(`/products/${id}`),
  });
};
