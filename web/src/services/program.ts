import type { ChannelService } from './channel';
import type { ChatService } from './chat';
import { type SpeecherService } from './speecher';

export interface Program {
  readonly chat: ChatService;
  readonly speecher: SpeecherService;
  readonly channel: ChannelService;
}
