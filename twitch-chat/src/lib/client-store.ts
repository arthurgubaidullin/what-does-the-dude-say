import {
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  reaction,
} from 'mobx';
import { NewMessage } from './new-message';
import * as Client from './client';
import { constVoid } from 'fp-ts/function';

export const create = (addNewMessage: (newMessage: NewMessage) => void) => {
  const client$ = observable.box(Client.create(), { deep: false });

  let unsubscribe = constVoid;

  onBecomeObserved(client$, () => {
    unsubscribe = reaction(
      () => client$.get(),
      (client, previous) => {
        previous.once('connected', () => {
          previous.disconnect();
        });

        client.connect();
      }
    );
  });

  onBecomeUnobserved(client$, () => {
    unsubscribe();
    unsubscribe = constVoid;
  });

  const updateChannels = action((channels: string[]) => {
    const updated = Client.create(channels);

    client$.set(updated);
  });

  autorun(() => {
    client$.get().on('message', (channel, user, message) => {
      addNewMessage({
        channel,
        message,
        from: user.username ?? 'unknown',
      });
    });
  });

  return {
    get: () => client$.get(),
    updateChannels,
  };
};
