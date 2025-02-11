import { cn } from '@/shared/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion'; // 또는 motion one의 React API 사용

// 애니메이션 Variants (재사용 가능)
const chatItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

type AvatarProps = {
  color: string;
};
const Avatar = ({ color }: AvatarProps) => {
  return (
    <div
      className={cn('w-[18px] h-[18px] rounded-full border border-slate-200')}
      style={{ backgroundColor: color }}
    />
  );
};

type NicknameProps = {
  nickname: string;
};
const Nickname = ({ nickname }: NicknameProps) => {
  return <b className='text-slate-500 text-sm'>{nickname}</b>;
};

type UserInfoProps = {
  self?: boolean;
  children: ReactNode;
};
export const UserInfo = ({ self = false, children }: UserInfoProps) => {
  return (
    <div
      className={cn(
        'flex flex-row gap-1 items-center ml-1',
        self ? 'self-end' : 'self-start'
      )}
    >
      {children}
    </div>
  );
};

type MessageProps = {
  self?: boolean;
  message: string | ReactNode;
};
const Message = ({ self = false, message }: MessageProps) => {
  return (
    <div
      className={`max-w-md p-3 rounded-lg shadow-md break-words ${
        self
          ? 'self-end bg-blue-500 text-white'
          : 'self-start bg-gray-200 text-gray-800'
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
    <motion.div
      variants={chatItemVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'max-w-md flex flex-col items-start gap-1',
        self ? 'self-end' : 'self-start'
      )}
    >
      {children}
    </motion.div>
  );
};

ChatItem.Avatar = Avatar;
ChatItem.Nickname = Nickname;
ChatItem.UserInfo = UserInfo;
ChatItem.Message = Message;
