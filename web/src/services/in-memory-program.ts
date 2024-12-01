import type { ChannelService } from './channel';
import type { ChatService } from './chat';
import type { Program } from './program';
import type { SpeecherService } from './speecher';
import { effect } from '@preact/signals';
import type { TwitchService } from './twitch';

export class InMemoryProgram implements Program {
  constructor(
    public readonly chat: ChatService,
    public readonly speecher: SpeecherService,
    public readonly channel: ChannelService,
    public readonly twitch: TwitchService,
  ) {
    effect(() => {
      const channel = this.channel.name.value;

      if (!channel) {
        return;
      }

      this.twitch.changeChannel(channel);
    });

    effect(() => {
      const message = this.twitch.lastMessage.value;

      if (!message) {
        return;
      }

      this.chat.addMessage(message);
    });

    effect(() => {
      const lastMessage = this.chat.lastMessage.value;

      if (lastMessage) {
        this.speecher.say(lastMessage.content);
      }
    });
  }
}
