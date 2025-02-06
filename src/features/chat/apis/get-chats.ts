import { API_URLS } from '@/shared/constants';
import { axiosInstance } from '@/shared/plugins';

export const getChats = async () => {
  const { data } = await axiosInstance.get(API_URLS.GET_ALL_CHATS);
  return data;
};
