import { DragStart, DropResult } from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { useRandomUserStore } from '@/shared/stores';

import { DRAGGING_INFOS, WORK_DRAG_END, WORK_DRAG_START, WORK_STATUS_UPDATE } from '../constants';
import { useGetAllWorksQuery } from '../hooks';
import { useBoardStore, useWorkSocketStore } from '../stores';
import { DraggingInfo, Work } from '../types';

export const useBoardHandler = () => {
  const queryClient = useQueryClient();
  const socketInstance = useWorkSocketStore((state) => state.socketInstance);
  const user = useRandomUserStore((state) => state.user);
  const setDraggingInfos = useBoardStore((state) => state.setDraggingInfos);
  const { data: works } = useGetAllWorksQuery();

  const onDragStart = (start: DragStart) => {
    socketInstance?.emit(WORK_DRAG_START, {
      user: user,
      workID: start.draggableId,
      status: start.source.droppableId,
    });
  };

  const onDragEnd = (result: DropResult) => {
    socketInstance?.emit(WORK_DRAG_END, {
      user: user,
      status: result.destination?.droppableId,
      workID: result.draggableId,
    });
  };

  useEffect(() => {
    socketInstance?.on(DRAGGING_INFOS, (infos: DraggingInfo[]) => {
      setDraggingInfos(infos);
    });
    socketInstance?.on(WORK_STATUS_UPDATE, (info: { workID: string; status: Work['status'] }) => {
      const { workID, status } = info;
      queryClient.setQueryData(QUERY_KEYS.work.list.queryKey, (oldWorks: Work[]) => {
        const newWorks = oldWorks.map((work) => {
          if (work.id.toString() === workID)
            return {
              ...work,
              status: status,
            };
          else return work;
        });
        return newWorks;
      });
    });

    return () => {
      socketInstance?.off(DRAGGING_INFOS);
      socketInstance?.off(WORK_STATUS_UPDATE);
    };
  }, [socketInstance]);

  const plannedWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'planned') ?? [];
  }, [works]);

  const inProgressWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'in_progress') ?? [];
  }, [works]);

  const doneWorks = useMemo(() => {
    return works?.filter((work) => work.status === 'done') ?? [];
  }, [works]);

  return {
    plannedWorks,
    inProgressWorks,
    doneWorks,
    onDragStart,
    onDragEnd,
  };
};
