import { program } from '../program-instance';
import { ChangeChannelForm } from './change-channel-form';
import { OnOffSpeecher } from './on-off-speecher';

export const Chat = () => {
  const { speecher, chat, channel } = program;

  return (
    <section className="grid gap-4">
      <ChangeChannelForm channel={channel} />

      <div className="flex gap-1">
        <h2 className="text-5xl">Chat messages</h2>
        <OnOffSpeecher speecher={speecher} />
      </div>

      <div>
        {chat.messages.value.map((message) => (
          <div key={message.id} className="chat chat-start">
            <div className="chat-header">{message.from}</div>
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
