import React, { useEffect, useRef } from 'react';

type Message = {
  id: number | string;
  text: string;
  self?: boolean; // 내가 보낸 메시지인지 여부
};

export const ChatBoard = () => {
  // 예시 메시지 배열 (실제 환경에서는 소켓 이벤트나 TanStack Query로 데이터 업데이트)
  const messages: Message[] = [
    { id: 1, text: '안녕하세요! 채팅방에 오신 것을 환영합니다.', self: false },
    { id: 2, text: '안녕하세요, 저는 익명 사용자입니다.', self: true },
    { id: 3, text: '오늘 날씨가 참 좋네요.', self: false },
    { id: 4, text: '정말 그렇네요! 채팅으로 소통해봐요.', self: true },
  ];

  // 스크롤을 항상 맨 아래로 유지하기 위한 ref
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-col h-full p-4 space-y-3 overflow-y-auto bg-gray-50'>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-md p-3 rounded-lg shadow-md break-words ${
            msg.self
              ? 'self-end bg-blue-500 text-white'
              : 'self-start bg-gray-200 text-gray-800'
          }`}
        >
          {msg.text}
        </div>
      ))}
      {/* 스크롤 맨 아래 위치 */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
