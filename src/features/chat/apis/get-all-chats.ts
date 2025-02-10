import { API_URLS } from '@/shared/constants';
import { axiosInstance } from '@/shared/plugins';
import { Chat } from '../types';

export const getAllChats = async (roomID: string) => {
  const { data } = await axiosInstance.get<Chat[]>(API_URLS.GET_ALL_CHATS, {
    params: { roomID },
  });
  return data;
};
