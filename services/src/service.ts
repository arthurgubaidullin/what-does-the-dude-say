import type {
  ChannelsService,
  Services as _Services,
} from '@what-does-the-dude-say/interfaces';

export class Services implements _Services {
  #channels: ChannelsService;

  constructor(channels: ChannelsService) {
    this.#channels = channels;
  }

  get channels(): ChannelsService {
    return this.#channels;
  }
}
