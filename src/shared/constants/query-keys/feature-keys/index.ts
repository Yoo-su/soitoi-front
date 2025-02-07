import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { CHAT_KEYS } from './chat';
import { ROOM_KEYS } from './room';
export const FEATURE_KEYS = mergeQueryKeys(CHAT_KEYS, ROOM_KEYS);
