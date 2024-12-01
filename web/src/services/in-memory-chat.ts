import {
  computed,
  effect,
  signal,
  Signal,
  type ReadonlySignal,
} from '@preact/signals';
import type { ChatService, Message } from './chat';
import { nanoid as generateId } from 'nanoid';

export class InMemoryChatService implements ChatService {
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

    effect(() => {
      console.log(this.#messages.value);
    });
  }

  addMessage(newMessage: Message) {
    const message = {
      id: newMessage.id,
      from: newMessage.from,
      content: newMessage.content,
      addedAt: new Date(),
    };

    const messages = this.#messages.peek();

    this.#messages.value = new Map(messages.set(message.id, message));
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
