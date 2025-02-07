import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '../../apis';

export const useGetAllChatsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.chat.list().queryKey,
    queryFn: getAllChats,
  });
};
