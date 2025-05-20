type ChannelData = Readonly<{
  id: string;
  name: string;
}>;

type NewChannelData = Readonly<{
  name: string;
}>;

export interface ChannelsRepository {
  readonly items: () => ReadonlyArray<ChannelData>;
  readonly add: (newChannelData: NewChannelData) => void;
}
