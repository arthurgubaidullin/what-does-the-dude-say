import { NewMessage } from './new-message';

export type Message = Readonly<{
  channel: string;
  message: string;
  from: string;
  id: string;
  date: Date;
}>;

export const create = (newMessage: NewMessage): Message => {
  return {
    id: crypto.randomUUID(),
    channel: newMessage.channel,
    message: newMessage.message,
    from: newMessage.from,
    date: new Date(),
  };
};
