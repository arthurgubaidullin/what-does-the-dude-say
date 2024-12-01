import { BrowserSpeecher } from './browser-speecher';
import { InMemoryChatService } from './in-memory-chat';
import { InMemoryProgram } from './in-memory-program';
import { type Program } from './program';

export class InMemoryProgramFactory {
  private constructor() {}

  static get(): Program {
    return new InMemoryProgram(
      new InMemoryChatService(),
      new BrowserSpeecher(),
    );
  }
}
