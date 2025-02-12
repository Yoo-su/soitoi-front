'use client';

import { SOCKET_URLS } from '@/shared/constants';
import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { User } from '@/shared/types';

type WorkSocketStoreState = {
  socketInstance: Socket | null;
  connect: (user: User) => void;
  disconnect: () => void;
};

export const useWorkSocketStore = create<WorkSocketStoreState>((set, get) => ({
  socketInstance: null,

  // 소켓 인스턴스가 없을 때만 생성하고, 연결 상태를 저장합니다.
  connect: (user: User) => {
    if (!get().socketInstance) {
      const socket = io(SOCKET_URLS.WORK_BOARD, {
        transports: ['websocket'],
        auth: {
          user: user,
        },
      });

      socket.on('connect', () => {
        console.log('Socket connected with id:', socket.id);
      });

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
