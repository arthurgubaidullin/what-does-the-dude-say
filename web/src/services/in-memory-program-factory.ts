import { BrowserSpeecher } from './browser-speecher';
import { InMemoryChannelService } from './in-memory-channel';
import { InMemoryChatService } from './in-memory-chat';
import { InMemoryProgram } from './in-memory-program';
import { type Program } from './program';
import { SimpleTwitchService } from './simple-twitch';

export class InMemoryProgramFactory {
  private constructor() {}

  static get(): Program {
    return new InMemoryProgram(
      new InMemoryChatService(),
      new BrowserSpeecher(),
      new InMemoryChannelService(),
      new SimpleTwitchService('vika_karter'),
    );
  }
}
