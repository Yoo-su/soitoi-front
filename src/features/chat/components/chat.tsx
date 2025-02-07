type ChatProps = {
  message: string;
};
export const Chat = ({ message }: ChatProps) => {
  return (
    <div className={'rounded-md max-w-[300px] flex-wrap bg-opacity-50 p-4'}>
      {message}
    </div>
  );
};
