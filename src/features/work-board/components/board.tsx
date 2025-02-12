import { DragDropContext } from '@hello-pangea/dnd';
import { useBoardHandler } from '../hooks';

import { StatusColumn } from './status-column';

export const Board = () => {
  const { plannedWorks, inProgressWorks, doneWorks, onDragStart, onDragEnd } =
    useBoardHandler();

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={'flex flex-row justify-center gap-8 mx-56 my-20 w-full'}>
        <StatusColumn status={'planned'} works={plannedWorks} />
        <StatusColumn status={'in_progress'} works={inProgressWorks} />
        <StatusColumn status={'done'} works={doneWorks} />
      </div>
    </DragDropContext>
  );
};
