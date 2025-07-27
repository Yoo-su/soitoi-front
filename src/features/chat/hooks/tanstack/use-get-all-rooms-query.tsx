import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants/query-keys';

import { getAllRooms } from '../../apis/get-all-rooms';

export const useGetAllRoomsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.room.list().queryKey,
    queryFn: getAllRooms,
  });
};
