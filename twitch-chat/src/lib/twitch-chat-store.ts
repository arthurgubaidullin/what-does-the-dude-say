import { IO } from 'fp-ts/IO';
import { autorun, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import * as Channels from './channels-store';
import * as Messages from './chat-store';
import * as Client from './client-store';

export const create = () => {
  const channels = Channels.create();
  const messages = Messages.create();
  const client = Client.create(messages.addMessage);

  const cleanup: Set<IO<void>> = new Set();

  onBecomeObserved(messages.list, () => {
    cleanup.add(
      autorun(() => {
        client.get();
      })
    );

    cleanup.add(
      autorun(() => {
        const list = channels.getList();

        client.updateChannels(list);
      })
    );
  });

  onBecomeUnobserved(messages.list, () => {
    cleanup.forEach((f) => f());
    cleanup.clear();
  });

  return {
    channels: channels,
    join: channels.add,
    part: channels.remove,
    messages: messages.list,
  };
};
