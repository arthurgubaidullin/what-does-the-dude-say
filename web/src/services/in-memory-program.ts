import type { ChatService } from './chat';
import type { Program } from './program';
import type { SpeecherService } from './speecher';
import { effect } from '@preact/signals';

export class InMemoryProgram implements Program {
  constructor(
    public readonly chat: ChatService,
    public readonly speecher: SpeecherService,
  ) {
    effect(() => {
      const lastMessage = this.chat.lastMessage.value;

      if (lastMessage) {
        this.speecher.say(lastMessage.content);
      }
    });
  }
}
