import { ChangeEvent, useState } from "react";
import { Button, Input } from "@headlessui/react";
import { debounce } from "lodash";
import { useChatRoomStore, useChatSocketStore } from "../stores";

export const ChatInput = () => {
  const roomID = useChatRoomStore((state) => state.currentRoomID);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const [chatInput, setChatInput] = useState<string>("");

  const handleChangeChatInput = (event: ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleSubmitChat = () => {
    const newChat = socketInstance?.emit("new-chat");
  };

  return (
    <div
      className={
        "w-full flex flew-row gap-4 p-4 items-center border border-slate-100 rounded-lg shadow-md "
      }
    >
      <Input
        onChange={handleChangeChatInput}
        className={"flex-grow border-none rounded-md px-2 focus:outline-none"}
        name={"chat"}
        value={chatInput}
        placeholder={"메시지를 입력하세요. . ."}
      />
      <Button className={"rounded-full w-fit bg-[#459046] text-white px-2 "}>
        {`>`}
      </Button>
    </div>
  );
};
