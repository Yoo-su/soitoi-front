'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { generateRandomNickname, generateRandomColorCode } from '../utils';
import { User } from '../types';
type RandomUserStoreState = {
  user: User | null;
  typingUsers: User[];

  createUser: () => void;
  setTypingUsers: (users: User[]) => void;
};
export const useRandomUserStore = create<RandomUserStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      typingUsers: [],
      createUser: () => {
        if (get().user) return;
        set({
          user: {
            nickname: generateRandomNickname(),
            color: generateRandomColorCode(),
          },
        });
      },
      setTypingUsers: (users) => set({ typingUsers: users }),
    }),
    {
      name: 'random-user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
