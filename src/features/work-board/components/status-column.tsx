import { Droppable } from '@hello-pangea/dnd';

import { cn } from '@/shared/utils';

import { STATUS_DOMAIN_INFO } from '../constants';
import { Work } from '../types';
import { WorkCard } from './work-card';

type StatusColumnProps = {
  status: Work['status'];
  works: Work[];
};
export const StatusColumn = ({ status, works }: StatusColumnProps) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={'flex w-full flex-col'}>
          <div
            style={{
              backgroundColor: STATUS_DOMAIN_INFO[status].bannerColor,
            }}
            className={cn('flex flex-row items-center justify-center py-3', 'rounded-t-md')}
          >
            <b className={'font-extrabold'}>{STATUS_DOMAIN_INFO[status].title}</b>
          </div>

          <div className={'flex flex-col gap-2 bg-[#F1F2F4] p-2'}>
            {works.map((work, index) => (
              <WorkCard key={work.id} {...work} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
