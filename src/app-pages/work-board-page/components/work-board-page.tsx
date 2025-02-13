'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { Container } from '@/features/work-board/components/container';

type WorkBoardPageComponentProps = {
  dehydratedWorks: DehydratedState;
};
export const WorkBoardPageComponent = ({ dehydratedWorks }: WorkBoardPageComponentProps) => {
  return (
    <HydrationBoundary state={dehydratedWorks}>
      <div className="flex min-h-[620px] w-full justify-center">
        <Container />
      </div>
    </HydrationBoundary>
  );
};
