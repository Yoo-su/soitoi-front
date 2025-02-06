'use client';

import { SOCKET_URLS } from '@/shared/constants';
import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';

type ChatSocketStoreState = {
  socketInstance: Socket | null;
  connect: () => void;
  disconnect: () => void;
};

export const useChatSocketStore = create<ChatSocketStoreState>((set, get) => ({
  socketInstance: null,

  // 소켓 인스턴스가 없을 때만 생성하고, 연결 상태를 저장합니다.
  connect: () => {
    if (!get().socketInstance) {
      const socket = io(SOCKET_URLS.CHAT, {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('Socket connected with id:', socket.id);
      });
      // 필요에 따라 다른 이벤트 핸들러들도 추가할 수 있습니다.
      set({ socketInstance: socket });
    }
  },

  // 현재 저장된 소켓 인스턴스가 있다면 연결 해제 후 null로 초기화합니다.
  disconnect: () => {
    const socket = get().socketInstance;
    if (socket) {
      socket.disconnect();
      set({ socketInstance: null });
    }
  },
}));
