import { signal, type ReadonlySignal } from '@preact/signals';
import { nanoid as generateId } from 'nanoid';
import tmi from 'tmi.js';
import type { Message, TwitchService } from './twitch';

export class SimpleTwitchService implements TwitchService {
  #lastMessage = signal<Message | undefined>(undefined);

  constructor(channel: string) {
    const client = new tmi.Client({
      channels: [channel],
    });

    client.connect();

    client.on('message', (_channel, tags, content) => {
      const from = tags['display-name'] ?? '';

      this.#lastMessage.value = Object.freeze<Message>({
        id: generateId(),
        from,
        content,
      });
    });
  }

  get lastMessage(): ReadonlySignal<Message | undefined> {
    return this.#lastMessage;
  }
}
