import { create } from 'zustand';

type ChatRoomStoreState = {
  currentRoomID: number | null;
  isChatModalOpen: boolean;

  setCurrentRoomID: (roomID: number) => void;
  toggleChatModal: () => void;
};
export const useChatRoomStore = create<ChatRoomStoreState>((set) => ({
  currentRoomID: null,
  isChatModalOpen: false,

  setCurrentRoomID: (roomID) => set({ currentRoomID: roomID }),
  toggleChatModal: () =>
    set((state) => ({ isChatModalOpen: !state.isChatModalOpen })),
}));
