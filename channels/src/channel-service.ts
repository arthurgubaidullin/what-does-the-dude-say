import { signal, type ReadonlySignal, type Signal } from '@preact/signals';
import type {
  ChannelData,
  ChannelService,
} from '@what-does-the-dude-say/interfaces';
import type { RemoveChannel } from './interfaces';

export class Channel implements ChannelService {
  readonly #id: string;
  readonly #data: Signal<ChannelData>;

  constructor(
    private readonly channels: RemoveChannel,
    channelData: ChannelData,
  ) {
    this.#id = channelData.id;
    this.#data = signal(channelData);
  }

  get id(): string {
    return this.#id;
  }

  get data(): ReadonlySignal<ChannelData> {
    return this.#data;
  }

  async remove(): Promise<void> {
    return await this.channels.remove(this.#id);
  }
}
