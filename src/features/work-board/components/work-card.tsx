import { Draggable } from '@hello-pangea/dnd';
import { Work } from '../types';
import { useBoardStore } from '../stores';
import { useMemo } from 'react';
import { PropagateLoader } from 'react-spinners';
import { AnimatePresence, motion } from 'motion/react';

type WorkCardProps = Work & { index: number };
export const WorkCard = ({ id, title, created_by, index }: WorkCardProps) => {
  const { draggingInfos } = useBoardStore();

  const draggingInfo = useMemo(() => {
    return draggingInfos.find((info) => info.workID === id.toString());
  }, [draggingInfos]);

  return (
    <Draggable
      index={index}
      draggableId={id.toString()}
      isDragDisabled={!!draggingInfo}
    >
      {(provided, snapshot) => (
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='flex flex-col relative items-start justify-self-auto bg-white rounded-md px-3 py-4 cursor-pointer'
            >
              <b className='font-extrabold text-lg'>{title}</b>
              <br />
              <label className='justify-end'>{created_by} 작성</label>
              <AnimatePresence>
                {draggingInfo && (
                  <motion.div
                    key='drag-overlay'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    exit={{ opacity: 0 }}
                    className='text-white rounded-md absolute top-0 left-0 bg-black w-full h-full flex flex-col gap-3 justify-center items-center'
                  >
                    <label className='text-xs'>
                      {draggingInfo.user.nickname}
                    </label>
                    <PropagateLoader size={2} color='#fff' />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Draggable>
  );
};
