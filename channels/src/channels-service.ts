import { signal, type ReadonlySignal, type Signal } from '@preact/signals';
import type {
  ChannelData,
  ChannelsRepository,
  ChannelsService,
  NewChannelData,
} from '@what-does-the-dude-say/interfaces';

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

  add(newChannelData: NewChannelData): void {
    const channelData: ChannelData = {
      id: newChannelData.name.trim().toLowerCase(),
      name: newChannelData.name,
    };

    this.#repository.add(channelData);

    this.#update();
  }

  #update(this: this) {
    const items = this.#repository.items();

    this.#items.value = items;
  }
}
