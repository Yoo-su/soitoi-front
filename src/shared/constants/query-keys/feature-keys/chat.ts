import { createQueryKeys } from '@lukemorales/query-key-factory';

export const CHAT_KEYS = createQueryKeys('chat', {
  // 채팅 목록을 가져올 때 사용하는 쿼리 키
  list: () => ['chat', 'list'] as const,

  // 특정 채팅방의 상세 정보를 가져올 때 사용하는 쿼리 키 (chatId를 파라미터로 받음)
  detail: (chatId: string) => ['chat', 'detail', chatId] as const,

  // 특정 채팅방의 메시지 목록을 가져올 때 사용하는 쿼리 키 (chatId를 파라미터로 받음)
  messages: (chatId: string) => ['chat', 'messages', chatId] as const,

  // 예시: 특정 채팅방의 읽지 않은 메시지 개수를 가져올 때 사용하는 쿼리 키
  unreadCount: (chatId: string) => ['chat', 'unreadCount', chatId] as const,
});
