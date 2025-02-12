import { User } from '@/shared/types';
import { Work } from './work.type';

export type DraggingInfo = {
  user: User;
  workID: Work['id'];
};
