import { signal, type ReadonlySignal, type Signal } from '@preact/signals';
import type {
  ChannelData,
  ChannelsRepository,
  ChannelsService,
  NewChannelData,
} from '@what-does-the-dude-say/interfaces';
import { createChannelData } from './channel-data';

export class Channels implements ChannelsService {
  #repository: ChannelsRepository;
  #items: Signal<ReadonlyArray<ChannelData>>;

  constructor(repository: ChannelsRepository) {
    this.#items = signal([]);
    this.#repository = repository;
  }

  get items(): ReadonlySignal<ReadonlyArray<ChannelData>> {
    return this.#items;
  }

  async add(newChannelData: NewChannelData): Promise<void> {
    const channelData = createChannelData(newChannelData);

    this.#repository.add(channelData);

    this.#update();
  }

  async #update(this: this) {
    const items = await this.#repository.items();

    this.#items.value = items;
  }
}
