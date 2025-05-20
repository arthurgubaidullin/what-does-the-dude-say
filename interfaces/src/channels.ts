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
