import { useEffect } from 'react';
import { BANNER_TITLE, PARTICIPANTS } from '../constants';
import { useBoardStore, useWorkSocketStore } from '../stores';
import { User } from '@/shared/types';
import { cn } from '@/shared/utils';
import { useRandomUserStore } from '@/shared/stores';
import { motion } from 'motion/react';

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
    <div
      className={
        'w-full flex flex-row justify-between items-center gap-8 bg-white rounded-full px-8 py-4'
      }
    >
      <h5
        className={
          'font-extrabold text-lg bg-gray-100 p-2 rounded-md border border-gray-200'
        }
      >
        {BANNER_TITLE}
      </h5>

      <div className='flex flex-row items-center gap-1'>
        {participants.map((participant) => (
          <div key={participant.nickname} className='relative group'>
            {/* Avatar */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className={cn('w-8 h-8 rounded-full')}
              style={{ backgroundColor: participant.color }}
            />
            <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black py-1.5 px-3 text-xs text-white rounded-lg'>
              {participant.nickname}
            </div>
          </div>
        ))}
        <label
          className={'ml-2 text-gray-500'}
        >{`${participants.length}명 참여중`}</label>
      </div>
    </div>
  );
};
