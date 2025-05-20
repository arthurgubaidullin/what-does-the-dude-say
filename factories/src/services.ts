import {
  Channels,
  InMemoryChannelsRepository,
} from '@what-does-the-dude-say/channels';
import type { Services as _Services } from '@what-does-the-dude-say/interfaces';
import { Services } from '@what-does-the-dude-say/services';

export const services = (): _Services => {
  const repository = new InMemoryChannelsRepository();

  const channelsService = new Channels(repository);

  return new Services(channelsService);
};
