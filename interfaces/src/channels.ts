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
  readonly remove: (channelId: string) => Promise<void>;
}

export type Unsubscribe = () => void;

export interface ChannelService {
  readonly id: string;
  readonly data: ReadonlySignal<ChannelData>;
  readonly remove: () => Promise<void>;
}

export interface ChannelsService {
  readonly items: ReadonlySignal<ReadonlyArray<ChannelService>>;
  readonly add: (newChannelData: NewChannelData) => Promise<void>;
  readonly subscribe: () => Unsubscribe;
}
