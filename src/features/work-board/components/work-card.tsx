import { Draggable } from '@hello-pangea/dnd';
import { Work } from '../types';

type WorkCardProps = Work;
export const WorkCard = ({ id, title, created_by }: WorkCardProps) => {
  return (
    <Draggable index={id} draggableId={id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col items-start justify-self-auto bg-white rounded-sm p-2 cursor-pointer'
        >
          <b className={'font-extrabold'}>{title}</b>
          <br />
          <label className={'justify-end'}>{created_by} 작성</label>
        </div>
      )}
    </Draggable>
  );
};
