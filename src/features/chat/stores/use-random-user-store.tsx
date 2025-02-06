'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { generateRandomNickname } from '../utils';

type RandomUserStoreState = {
  nickname: string;
  setNickname: () => void;
  createNickname: () => void;
};
export const useRandomUserStore = create<RandomUserStoreState>()(
  persist(
    (set, get) => ({
      nickname: '',
      setNickname: () => set({ nickname: generateRandomNickname() }),
      createNickname: () => {
        if (get().nickname) return;
        get().setNickname();
      },
    }),
    {
      name: 'random-user-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        nickname: state.nickname,
      }),
    }
  )
);
