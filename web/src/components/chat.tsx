import { useState } from 'preact/hooks';
import { type ChatService } from '../services/chat';
import { InMemoryChatService } from '../services/in-memory-chat';

export const Chat = () => {
  const [chatService] = useState<ChatService>(() => new InMemoryChatService());

  return (
    <section class="grid gap-4">
      <h2 class="text-5xl">Chat messages</h2>

      <div>
        {chatService.messages.value.map((message) => (
          <div class="chat chat-start">
            <div class="chat-header">{message.from}</div>
            <div class="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
