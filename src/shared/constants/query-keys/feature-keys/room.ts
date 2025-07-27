import { createQueryKeys } from '@lukemorales/query-key-factory';

export const ROOM_KEYS = createQueryKeys('room', {
  // 채팅 목록을 가져올 때 사용하는 쿼리 키
  list: () => ['room', 'list'] as const,
});
