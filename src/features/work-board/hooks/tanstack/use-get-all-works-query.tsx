import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants/query-keys';

import { getAllWorks } from '../../apis/get-all-works';

export const useGetAllWorksQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.work.list.queryKey,
    queryFn: getAllWorks,
  });
};
