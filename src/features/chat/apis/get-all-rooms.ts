import { API_URLS } from '@/shared/constants';
import { axiosInstance } from '@/shared/plugins';

import { Room } from '../types';

export const getAllRooms = async () => {
  const { data } = await axiosInstance.get<Room[]>(API_URLS.GET_ALL_ROOMS);
  return data;
};
