import {
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';
import { NewMessage } from './new-message';
import * as Client from './client';

export const create = (addNewMessage: (newMessage: NewMessage) => void) => {
  const client$ = observable.box(Client.create());

  autorun(() => {
    client$.get().on('message', (channel, user, message) => {
      addNewMessage({
        channel,
        message,
        from: user.username ?? 'unknown',
      });
    });
  });

  let seq = Promise.resolve();

  onBecomeObserved(client$, () => {
    seq = seq.then(async () => {
      await client$.get().connect();
    });
  });

  onBecomeUnobserved(client$, () => {
    seq = seq.then(async () => {
      await client$.get().disconnect();
    });
  });

  const updateChannels = action((channels: string[]) => {
    const updated = Client.create(channels);

    client$.set(updated);
  });

  return {
    get: () => client$.get(),
    updateChannels,
  };
};
