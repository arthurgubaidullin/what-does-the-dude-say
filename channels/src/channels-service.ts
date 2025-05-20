import {
  computed,
  signal,
  type ReadonlySignal,
  type Signal,
} from '@preact/signals';
import type {
  ChannelData,
  ChannelService,
  ChannelsRepository,
  ChannelsService,
  NewChannelData,
  Unsubscribe,
} from '@what-does-the-dude-say/interfaces';
import { createChannelData } from './channel-data';
import { Channel } from './channel-service';
import type { RemoveChannel } from './interfaces';

export class Channels implements ChannelsService, RemoveChannel {
  readonly #repository: ChannelsRepository;
  readonly #items: Signal<ReadonlyArray<ChannelData>> = signal([]);

  constructor(repository: ChannelsRepository) {
    this.#repository = repository;
  }

  subscribe(this: this): Unsubscribe {
    this.#update();

    return () => {};
  }

  get items(): ReadonlySignal<ReadonlyArray<ChannelService>> {
    return computed(() =>
      this.#items.value.map((data) => new Channel(this, data)),
    );
  }

  async add(newChannelData: NewChannelData): Promise<void> {
    const channelData = createChannelData(newChannelData);

    this.#repository.add(channelData);

    this.#update();
  }

  async remove(this: this, channelId: string): Promise<void> {
    await this.#repository.remove(channelId);

    this.#update();
  }

  async #update(this: this) {
    const items = await this.#repository.items();

    this.#items.value = items;
  }
}
