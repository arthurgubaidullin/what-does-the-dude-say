import { action, observable } from 'mobx';
import * as NewMessage from './new-message';
import * as Message from './message';

export const create = () => {
  const messages$ = observable.array<Message.Message>([]);

  const addMessage = action((newMessage: NewMessage.NewMessage) => {
    const message = Message.create(newMessage);

    messages$.unshift(message);

    if (messages$.length >= 100) {
      messages$.pop();
    }
  });

  return {
    messages: messages$,
    addMessage,
  };
};
