import type {
  ChannelData,
  NewChannelData,
} from '@what-does-the-dude-say/interfaces';

export const createChannelData = (
  newChannelData: NewChannelData,
): ChannelData => {
  const data = {
    id: newChannelData.name.trim().toLowerCase(),
    name: newChannelData.name,
  };

  return Object.freeze(data);
};
