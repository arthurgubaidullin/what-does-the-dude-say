import {
  Channels,
  InMemoryChannelsRepository,
} from '@what-does-the-dude-say/channels';
import type {
  Services as _Services,
  ChannelsRepository,
} from '@what-does-the-dude-say/interfaces';
import { Services } from '@what-does-the-dude-say/services';

let instance: null | Services = null;

export const services = (): _Services => {
  if (instance === null) {
    const repository: ChannelsRepository = new InMemoryChannelsRepository();

    const channelsService = new Channels(repository);

    instance = new Services(channelsService);
  }

  return instance;
};
