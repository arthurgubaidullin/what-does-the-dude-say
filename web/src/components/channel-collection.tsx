import type { ChannelsService } from '@what-does-the-dude-say/interfaces';
import { useEffect } from 'preact/hooks';

export const ChannelCollection = (props: { channels: ChannelsService }) => {
  const { channels } = props;

  useEffect(() => channels.subscribe(), [channels]);

  return (
    <>
      {channels.items.value.length === 0 ? (
        <p>No items!</p>
      ) : (
        <ul className="list-none">
          {channels.items.value.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};
