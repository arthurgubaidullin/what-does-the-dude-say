import type {
  ChannelsRepository,
  ChannelData,
} from '@what-does-the-dude-say/interfaces';

export class InMemoryChannelsRepository implements ChannelsRepository {
  #items: Map<string, ChannelData>;

  constructor() {
    this.#items = new Map();
  }

  items(this: this): ReadonlyArray<ChannelData> {
    return Array.from(this.#items.values());
  }

  add(this: this, channelData: ChannelData): void {
    if (this.#items.has(channelData.id)) {
      return;
    }

    this.#items.set(channelData.id, channelData);
  }
}
