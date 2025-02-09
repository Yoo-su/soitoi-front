import React, { useEffect, useRef } from "react";
import { SAMPLE_CHATS } from "../constants";
import { useRandomUserStore } from "../stores";
import { ChatItem } from "./chat-item";

type Message = {
  id: number | string;
  text: string;
  self?: boolean; // 내가 보낸 메시지인지 여부
};

export const ChatBoard = () => {
  const user = useRandomUserStore((state) => state.user);

  // 스크롤을 항상 맨 아래로 유지하기 위한 ref
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-6 overflow-y-auto bg-gray-50 scrollbar-hide">
      {SAMPLE_CHATS.map((chat) => {
        const self = chat.nickname === user?.nickname;
        return (
          <ChatItem key={chat.id} self={self}>
            <ChatItem.UserInfo self={self}>
              <ChatItem.Avatar color={chat.color} />
              <ChatItem.Nickname nickname={chat.nickname} />
            </ChatItem.UserInfo>

            <ChatItem.Message self={self} message={chat.message} />
          </ChatItem>
        );
      })}
      {/* 스크롤 맨 아래 위치 */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
