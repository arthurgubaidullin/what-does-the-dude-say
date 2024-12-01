import { useState } from 'preact/hooks';
import { type Program } from '../services/program';
import { OnOffSpeecher } from './on-off-speecher';
import { InMemoryProgramFactory } from '../services/in-memory-program-factory';

export const Chat = () => {
  const [program] = useState<Program>(() => InMemoryProgramFactory.get());

  const speecher = program.speecher;

  return (
    <section class="grid gap-4">
      <div class="flex gap-1">
        <h2 class="text-5xl">Chat messages</h2>
        <OnOffSpeecher speecher={speecher} />
      </div>

      <div>
        {program.chat.messages.value.map((message) => (
          <div class="chat chat-start">
            <div class="chat-header">{message.from}</div>
            <div class="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
