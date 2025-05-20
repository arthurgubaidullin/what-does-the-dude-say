import type { ReadonlySignal } from '@preact/signals';

export type ChannelData = Readonly<{
  id: string;
  name: string;
}>;

export type NewChannelData = Readonly<{
  name: string;
}>;

export interface ChannelsRepository {
  readonly items: () => ReadonlyArray<ChannelData>;
  readonly add: (channelData: ChannelData) => void;
}

export interface ChannelsService {
  readonly items: ReadonlySignal<ReadonlyArray<ChannelData>>;
  readonly add: (newChannelData: NewChannelData) => void;
}
