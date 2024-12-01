import { type ReadonlySignal } from '@preact/signals';

export interface Message {
  readonly id: string;
  readonly from: string;
  readonly content: string;
}

export interface TwitchService {
  readonly lastMessage: ReadonlySignal<Message | undefined>;
  readonly changeChannel: (channel: string) => void;
}
