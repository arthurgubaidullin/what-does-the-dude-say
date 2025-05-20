import { services } from '@what-does-the-dude-say/factories';
import { ChannelCollection } from './channel-collection';
import { NewChannelForm } from './new-channel-form';

const { channels } = services();

export const ChannelsPage = () => {
  return (
    <main className="grid gap-8">
      <h1 className="text-5xl">Channels</h1>

      <ChannelCollection channels={channels} />

      <NewChannelForm channels={channels} />
    </main>
  );
};
