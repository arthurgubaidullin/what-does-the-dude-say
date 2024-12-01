import { computed, signal, Signal, type ReadonlySignal } from '@preact/signals';
import { nanoid as generateId } from 'nanoid';
import type { ChatService, Message } from './chat';

export class InMemoryChatService implements ChatService {
  #limit: number = 100;
  #messages: Signal<Map<string, Message & { addedAt: Date }>>;

  constructor() {
    this.#messages = signal(new Map());

    let n = 1;

    setInterval(() => {
      this.addMessage({
        id: generateId(),
        from: 'Pirojok',
        content: 'test ' + n++,
      });
    }, 3000);
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

  get messages(): ReadonlySignal<readonly Message[]> {
    return computed(() => {
      return Array.from(this.#messages.value.values()).toSorted(
        (message1, message2) =>
          message2.addedAt.getTime() - message1.addedAt.getTime(),
      );
    });
  }
}
