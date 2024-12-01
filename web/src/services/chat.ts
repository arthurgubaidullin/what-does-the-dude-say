import { type ReadonlySignal } from '@preact/signals';

export interface Message {
  readonly id: string;
  readonly from: string;
  readonly content: string;
}

export interface ChatService {
  readonly messages: ReadonlySignal<readonly Message[]>;
  readonly lastMessage: ReadonlySignal<Message | undefined>;
  readonly addMessage: (message: Message) => void;
}
