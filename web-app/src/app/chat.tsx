import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import * as ChatClient from '@wdtds/twitch-chat';

const client = ChatClient.create();

export const Chat = observer((props?: { class?: string }) => {
  const messages = client.messages.map((message) => (
    <div className="chat chat-end" key={message.id}>
      <div className="chat-header">
        {message.from}{' '}
        <time className="text-xs opacity-50">
          {message.date.toLocaleTimeString()}{' '}
          {message.date.toLocaleDateString()}
        </time>
      </div>
      <div className="chat-bubble">{message.message}</div>
    </div>
  ));

  useEffect(() => {
    client.join('a_n_i_n_y_a');
  }, []);

  return <div className={props?.class ?? ''}>{messages}</div>;
});
