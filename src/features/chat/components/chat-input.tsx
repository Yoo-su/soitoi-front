import { Button, Input } from '@headlessui/react';
import { DiCoda } from 'react-icons/di';

import { useChatInputHandler } from '../hooks/use-chat-input-handler';

export const ChatInput = () => {
  const { inputRef, debouncedSetChatInput, handleSubmitMessage } = useChatInputHandler();

  return (
    <div className={'flew-row flex w-full items-center gap-4 rounded-lg border border-slate-100 p-4 shadow-md'}>
      <Input
        ref={inputRef}
        onChange={debouncedSetChatInput}
        className={'grow rounded-md border-none px-2 focus:outline-none'}
        name={'chat'}
        placeholder={'메시지를 입력하세요. . .'}
      />
      <Button
        className={'flex size-10 items-center justify-center rounded-full bg-[#459046] px-2 text-white'}
        onClick={handleSubmitMessage}
      >
        {<DiCoda size={26} />}
      </Button>
    </div>
  );
};
