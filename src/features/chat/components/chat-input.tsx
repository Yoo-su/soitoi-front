import { Button, Input } from '@headlessui/react';
import { DiCoda } from 'react-icons/di';

import { useChatInputHandler } from '../hooks/use-chat-input-handler';

export const ChatInput = () => {
  const { inputRef, debouncedSetChatInput, handleSubmitMessage } =
    useChatInputHandler();

  return (
    <div
      className={
        'w-full flex flew-row gap-4 p-4 items-center border border-slate-100 rounded-lg shadow-md'
      }
    >
      <Input
        ref={inputRef}
        onChange={debouncedSetChatInput}
        className={'flex-grow border-none rounded-md px-2 focus:outline-none'}
        name={'chat'}
        placeholder={'메시지를 입력하세요. . .'}
      />
      <Button
        className={
          'flex justify-center items-center rounded-full w-10 h-10 bg-[#459046] text-white px-2'
        }
        onClick={handleSubmitMessage}
      >
        {<DiCoda size={26} />}
      </Button>
    </div>
  );
};
