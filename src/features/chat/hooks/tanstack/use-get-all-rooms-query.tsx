import { useQuery } from '@tanstack/react-query';
import { getAllRooms } from '../../apis/get-all-rooms';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

export const useGetAllRoomsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.room.list().queryKey,
    queryFn: getAllRooms,
  });
};
