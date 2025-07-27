import { create } from 'zustand';

type ChatRoomStoreState = {
  currentRoomID: string | null;
  isChatModalOpen: boolean;

  setCurrentRoomID: (roomID: string) => void;
  toggleChatModal: () => void;
};
export const useChatRoomStore = create<ChatRoomStoreState>((set) => ({
  currentRoomID: null,
  isChatModalOpen: false,

  setCurrentRoomID: (roomID) => set({ currentRoomID: roomID }),
  toggleChatModal: () => set((state) => ({ isChatModalOpen: !state.isChatModalOpen })),
}));
