'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { generateRandomNickname, generateRandomColorCode } from '../utils';
import { User } from '../types';

type RandomUserStoreState = {
  user: User | null;
  createUser: () => void;
};
export const useRandomUserStore = create<RandomUserStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      createUser: () => {
        if (get().user) return;
        set({
          user: {
            nickname: generateRandomNickname(),
            color: generateRandomColorCode(),
          },
        });
      },
    }),
    {
      name: 'random-user-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
