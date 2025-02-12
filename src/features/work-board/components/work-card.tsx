import { Draggable } from '@hello-pangea/dnd';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { PropagateLoader } from 'react-spinners';

import { useBoardStore } from '../stores';
import { Work } from '../types';

type WorkCardProps = Work & { index: number };
export const WorkCard = ({ id, title, created_by, index }: WorkCardProps) => {
  const { draggingInfos } = useBoardStore();

  const draggingInfo = useMemo(() => {
    return draggingInfos.find((info) => info.workID === id.toString());
  }, [draggingInfos]);

  return (
    <Draggable index={index} draggableId={id.toString()} isDragDisabled={!!draggingInfo}>
      {(provided, snapshot) => (
        <AnimatePresence>
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="relative flex cursor-pointer flex-col items-start justify-self-auto rounded-md bg-white px-3 py-4"
            >
              <b className="text-lg font-extrabold">{title}</b>
              <br />
              <label className="justify-end">{created_by} 작성</label>
              <AnimatePresence>
                {draggingInfo && (
                  <motion.div
                    key="drag-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-0 flex size-full flex-col items-center justify-center gap-3 rounded-md bg-black text-white"
                  >
                    <label className="text-xs">{draggingInfo.user.nickname}</label>
                    <PropagateLoader size={2} color="#fff" />
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
