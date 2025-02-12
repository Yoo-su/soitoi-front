import { API_URLS } from '@/shared/constants';
import { axiosInstance } from '@/shared/plugins';

import { Work } from '../types';

export const getAllWorks = async () => {
  const { data } = await axiosInstance.get<Work[]>(API_URLS.GET_ALL_WORKS);
  return data;
};
