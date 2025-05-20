import type { ReadonlySignal } from '@preact/signals';

export type ChannelData = Readonly<{
  id: string;
  name: string;
}>;

export type NewChannelData = Readonly<{
  name: string;
}>;

export interface ChannelsRepository {
  readonly items: () => Promise<ReadonlyArray<ChannelData>>;
  readonly add: (channelData: ChannelData) => Promise<void>;
}

export interface ChannelsService {
  readonly items: ReadonlySignal<ReadonlyArray<ChannelData>>;
  readonly add: (newChannelData: NewChannelData) => Promise<void>;
}
