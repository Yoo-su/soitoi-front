import { cn } from "@/shared/utils";
import { ReactNode } from "react";

type AvatarProps = {
  color: string;
};
const Avatar = ({ color }: AvatarProps) => {
  return (
    <div
      className={cn("w-[18px] h-[18px] rounded-full border border-slate-200")}
      style={{ backgroundColor: color }}
    />
  );
};

type NicknameProps = {
  nickname: string;
};
const Nickname = ({ nickname }: NicknameProps) => {
  return <b className={"text-slate-500 text-sm"}>{nickname}</b>;
};

type UserInfoProps = {
  self: boolean;
  children: ReactNode;
};
export const UserInfo = ({ self, children }: UserInfoProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center ml-1",
        self ? "self-end" : "self-start"
      )}
    >
      {children}
    </div>
  );
};

type MessageProps = {
  self: boolean;
  message: string;
};
const Message = ({ self, message }: MessageProps) => {
  return (
    <div
      className={`max-w-md p-3 rounded-lg shadow-md break-words ${
        self
          ? "self-end bg-blue-500 text-white"
          : "self-start bg-gray-200 text-gray-800"
      }`}
    >
      {message}
    </div>
  );
};

type ChatItemProps = {
  self: boolean;
  children: ReactNode;
};
export const ChatItem = ({ self, children }: ChatItemProps) => {
  return (
    <div
      className={cn(
        "max-w-md flex flex-col items-start gap-1",
        self ? "self-end" : "self-start"
      )}
    >
      {children}
    </div>
  );
};
ChatItem.Avatar = Avatar;
ChatItem.Nickname = Nickname;
ChatItem.UserInfo = UserInfo;
ChatItem.Message = Message;
