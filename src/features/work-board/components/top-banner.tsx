import { motion } from 'motion/react';
import { useEffect } from 'react';

import { useRandomUserStore } from '@/shared/stores';
import { User } from '@/shared/types';
import { cn } from '@/shared/utils';

import { BANNER_TITLE, PARTICIPANTS } from '../constants';
import { useBoardStore, useWorkSocketStore } from '../stores';

export const TopBanner = () => {
  const user = useRandomUserStore((state) => state.user);
  const socketInstance = useWorkSocketStore((state) => state.socketInstance);
  const participants = useBoardStore((state) => state.participants);
  const setParticipants = useBoardStore((state) => state.setParticipants);

  useEffect(() => {
    socketInstance?.on(PARTICIPANTS, (participants: User[]) => {
      setParticipants(participants);
    });
  }, [socketInstance]);

  return (
    <div className={'flex w-full flex-row items-center justify-between gap-8 rounded-full bg-white px-8 py-4'}>
      <h5 className={'rounded-md border border-gray-200 bg-gray-100 p-2 text-lg font-extrabold'}>{BANNER_TITLE}</h5>

      <div className="flex flex-row items-center gap-1">
        {participants.map((participant) => (
          <div key={participant.nickname} className="group relative">
            {/* Avatar */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className={cn('h-8 w-8 rounded-full')}
              style={{ backgroundColor: participant.color }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {participant.nickname}
            </div>
          </div>
        ))}
        <label className={'ml-2 text-gray-500'}>{`${participants.length}명 참여중`}</label>
      </div>
    </div>
  );
};
