import { program } from '../program-instance';
import { ChangeChannelForm } from './change-channel-form';
import { OnOffSpeecher } from './on-off-speecher';

export const Chat = () => {
  const { speecher, chat, channel } = program;

  return (
    <section class="grid gap-4">
      <ChangeChannelForm channel={channel} />

      <div class="flex gap-1">
        <h2 class="text-5xl">Chat messages</h2>
        <OnOffSpeecher speecher={speecher} />
      </div>

      <div>
        {chat.messages.value.map((message) => (
          <div class="chat chat-start">
            <div class="chat-header">{message.from}</div>
            <div class="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
