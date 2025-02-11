import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useGetAllWorksQuery } from '../hooks';
import { useMemo } from 'react';
import { StatusColumn } from './status-column';

export const Board = () => {
  const { data: works } = useGetAllWorksQuery();

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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={'flex flex-row gap-8 mx-56 my-20'}>
        <StatusColumn status={'planned'} works={plannedWorks} />
        <StatusColumn status={'in_progress'} works={inProgressWorks} />
        <StatusColumn status={'done'} works={doneWorks} />
      </div>
    </DragDropContext>
  );
};
