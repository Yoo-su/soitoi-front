import { dehydrate, QueryClient } from '@tanstack/react-query';

import { WorkBoardPageComponent } from '@/app-pages/work-board-page/components/work-board-page';
import { getAllWorks } from '@/features/work-board/apis/get-all-works';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

const WorkBoardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.work.list.queryKey,
    queryFn: getAllWorks,
  });

  const dehydratedWorks = dehydrate(queryClient);

  return <WorkBoardPageComponent dehydratedWorks={dehydratedWorks} />;
};
export default WorkBoardPage;
