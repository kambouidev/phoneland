import { useQuery } from '@tanstack/react-query';
import { getApi } from '@/api';
import { IDevice } from '@/types/index';

export const useDevices = (search: string, offset: number) => {
  return useQuery({
    queryKey: ['devices', search, offset],
    queryFn: () =>
      getApi<IDevice[]>('/products', {
        search: search || undefined,
        limit: 20,
        offset,
      }),
  });
};
