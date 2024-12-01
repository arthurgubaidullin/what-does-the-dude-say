import { Signal, signal, type ReadonlySignal } from '@preact/signals';
import type { ChannelService } from './channel';

export class InMemoryChannelService implements ChannelService {
  #channel: Signal<string | undefined> = signal(undefined);

  constructor() {}

  get name(): ReadonlySignal<string | undefined> {
    return this.#channel;
  }

  select(this: this, channel: string) {
    if (channel === this.#channel.peek()) {
      return;
    }
    if (channel.length === 0) {
      this.#channel.value = undefined;
      return;
    }

    this.#channel.value = channel;
  }
}
