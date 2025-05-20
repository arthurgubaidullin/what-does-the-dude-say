import type {
  ChannelsRepository,
  ChannelData,
} from '@what-does-the-dude-say/interfaces';

export class InMemoryChannelsRepository implements ChannelsRepository {
  #items: Map<string, ChannelData>;

  constructor() {
    this.#items = new Map();
  }

  async items(this: this): Promise<ReadonlyArray<ChannelData>> {
    return Array.from(this.#items.values());
  }

  async add(this: this, channelData: ChannelData): Promise<void> {
    if (this.#items.has(channelData.id)) {
      return;
    }

    this.#items.set(channelData.id, channelData);
  }

  async remove(this: this, channelId: string): Promise<void> {
    if (!this.#items.has(channelId)) {
      return;
    }

    this.#items.delete(channelId);
  }
}
