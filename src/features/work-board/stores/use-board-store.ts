'use client';

import { create } from 'zustand';

import { User } from '@/shared/types';

import { DraggingInfo } from '../types';

type BoardStoreState = {
  participants: User[];
  draggingInfos: DraggingInfo[];

  setParticipants: (participants: User[]) => void;
  setDraggingInfos: (draggingInfos: DraggingInfo[]) => void;
};

export const useBoardStore = create<BoardStoreState>((set) => ({
  participants: [],
  draggingInfos: [],

  setParticipants: (participants) => set({ participants: [...participants] }),
  setDraggingInfos: (draggingInfos) => set({ draggingInfos: [...draggingInfos] }),
}));
