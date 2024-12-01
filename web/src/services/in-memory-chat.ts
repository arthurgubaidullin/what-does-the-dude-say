import { computed, signal, Signal, type ReadonlySignal } from '@preact/signals';
import type { ChatService, Message } from './chat';

export class InMemoryChatService implements ChatService {
  #limit: number = 100;
  #messages: Signal<Map<string, Message & { addedAt: Date }>>;

  constructor() {
    this.#messages = signal(new Map());
  }

  addMessage(newMessage: Message) {
    const message = {
      id: newMessage.id,
      from: newMessage.from,
      content: newMessage.content,
      addedAt: new Date(),
    };

    let messages = this.#messages.peek().set(message.id, message);

    if (messages.size >= this.#limit) {
      messages = new Map(
        Array.from(messages.entries())
          .sort(([, m1], [, m2]) => m2.addedAt.getTime() - m1.addedAt.getTime())
          .slice(0, this.#limit),
      );
    }

    this.#messages.value = new Map(messages);
  }

  get lastMessage() {
    return computed(() => this.sortedMessages.value[0]);
  }

  private get sortedMessages() {
    return computed(() => {
      return Array.from(this.#messages.value.values()).toSorted(
        (message1, message2) =>
          message2.addedAt.getTime() - message1.addedAt.getTime(),
      );
    });
  }

  get messages(): ReadonlySignal<readonly Message[]> {
    return this.sortedMessages;
  }
}
