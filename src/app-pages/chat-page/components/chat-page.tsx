"use client";

import { ChatBoard } from "@/features/chat/components/chat-board";
import { ChatInput } from "@/features/chat/components/chat-input";
import { RoomInfoPannel } from "@/features/chat/components/room-info";
import { useRandomUserStore } from "@/features/chat/stores";
import { useEffect } from "react";

export const ChatPageComponent = () => {
  const createUser = useRandomUserStore((state) => state.createUser);

  useEffect(() => {
    createUser();
  }, []);
  return (
    <div
      className={`container flex flex-row gap-10 items-center justify-start rounded-md bg-white h-[634px]`}
    >
      <RoomInfoPannel />

      <div className={"flex flex-col w-full h-full gap-4"}>
        <ChatBoard />
        <ChatInput />
      </div>
    </div>
  );
};
