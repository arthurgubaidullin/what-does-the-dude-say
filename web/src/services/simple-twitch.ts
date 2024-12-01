import { effect, signal, type ReadonlySignal } from '@preact/signals';
import { nanoid as generateId } from 'nanoid';
import tmi from 'tmi.js';
import type { Message, TwitchService } from './twitch';

export class SimpleTwitchService implements TwitchService {
  #lastMessage = signal<Message | undefined>(undefined);
  #channel = signal<string | undefined>(undefined);

  constructor() {
    let disconnect = (): void => void 0;

    effect(() => {
      disconnect();

      const channel = this.#channel.value;

      if (channel === undefined) {
        return;
      }

      const client = new tmi.Client({
        channels: [channel],
      });

      client.on('message', (_channel, tags, content) => {
        const from = tags['display-name'] ?? '';

        this.#lastMessage.value = Object.freeze<Message>({
          id: generateId(),
          from,
          content,
        });
      });

      client.connect();

      disconnect = () => {
        disconnect = () => void 0;
        return client.disconnect();
      };
    });
  }

  changeChannel(this: this, channel: string) {
    if (channel === '') {
      return;
    }
    if (channel.length === 0) {
      this.#channel.value = undefined;
      return;
    }

    this.#channel.value = channel;
  }

  get lastMessage(): ReadonlySignal<Message | undefined> {
    return this.#lastMessage;
  }
}
