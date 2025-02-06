import { useQuery } from '@tanstack/react-query';

export const useGetAllChatsQuery = () => {
  return useQuery({
    queryKey: ['tmp'],
    queryFn: () => {},
  });
};
