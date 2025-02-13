import { ReactNode } from 'react';

import { cn } from '@/shared/utils';

type AvatarProps = {
  color: string;
};
const Avatar = ({ color }: AvatarProps) => {
  return (
    <div className={cn('h-[18px] w-[18px] rounded-full border border-slate-200')} style={{ backgroundColor: color }} />
  );
};

type NicknameProps = {
  nickname: string;
};
const Nickname = ({ nickname }: NicknameProps) => {
  return <b className="text-sm text-slate-500">{nickname}</b>;
};

type UserInfoProps = {
  self?: boolean;
  children: ReactNode;
};
export const UserInfo = ({ self = false, children }: UserInfoProps) => {
  return (
    <div className={cn('ml-1 flex flex-row items-center gap-1', self ? 'self-end' : 'self-start')}>{children}</div>
  );
};

type MessageProps = {
  self?: boolean;
  message: string | ReactNode;
};
const Message = ({ self = false, message }: MessageProps) => {
  return (
    <div
      className={`max-w-md break-words rounded-lg p-3 shadow-md ${
        self ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-200 text-gray-800'
      }`}
    >
      {message}
    </div>
  );
};

type ChatItemProps = {
  self?: boolean;
  children: ReactNode;
};
export const ChatItem = ({ self = false, children }: ChatItemProps) => {
  return (
    <div className={cn('flex max-w-md flex-col items-start gap-1', self ? 'self-end' : 'self-start')}>{children}</div>
  );
};

ChatItem.Avatar = Avatar;
ChatItem.Nickname = Nickname;
ChatItem.UserInfo = UserInfo;
ChatItem.Message = Message;
