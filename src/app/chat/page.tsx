import { dehydrate, QueryClient } from '@tanstack/react-query';

import { ChatPageComponent } from '@/app-pages/chat-page/components';
import { getAllChats } from '@/features/chat/apis';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

const ChatPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.chat.list.queryKey,
    queryFn: () => getAllChats('1'),
  });

  const dehydratedChats = dehydrate(queryClient);

  return <ChatPageComponent dehydratedChats={dehydratedChats} />;
};
export default ChatPage;
