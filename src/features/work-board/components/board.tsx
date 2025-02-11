import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { useGetAllWorksQuery } from '../hooks';
import { useMemo } from 'react';
import { StatusColumn } from './status-column';
import { useWorkSocketStore } from '../stores';
import { WORK_DRAG_START } from '../constants';
import { useRandomUserStore } from '@/shared/stores';

export const Board = () => {
  const socketInstance = useWorkSocketStore((state) => state.socketInstance);
  const user = useRandomUserStore((state) => state.user);
  const { data: works } = useGetAllWorksQuery();

  const onDragStart = (start: DragStart) => {
    console.log(start);
    socketInstance?.emit(WORK_DRAG_START, {
      user: user,
      workID: start.draggableId,
    });
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  const plannedWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'planned') ?? [];
  }, [works]);

  const inProgressWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'in_progress') ?? [];
  }, [works]);

  const doneWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'done') ?? [];
  }, [works]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={'flex flex-row gap-8 mx-56 my-20'}>
        <StatusColumn status={'planned'} works={plannedWorks} />
        <StatusColumn status={'in_progress'} works={inProgressWorks} />
        <StatusColumn status={'done'} works={doneWorks} />
      </div>
    </DragDropContext>
  );
};
