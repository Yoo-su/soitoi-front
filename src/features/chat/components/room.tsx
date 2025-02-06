import { Button } from '@headlessui/react';
import { useChatSocketService } from '../hooks';

export const Room = () => {
  const { handleFindAllChats } = useChatSocketService();

  return (
    <div className='flex flex-row rounded-md w-full h-screen border-gray-100 m-2'>
      <Button
        className={`rounded-sm p-1 flex flex-row justify-center items-center bg-slate-100 border-black`}
        onClick={handleFindAllChats}
      >
        check
      </Button>
    </div>
  );
};
