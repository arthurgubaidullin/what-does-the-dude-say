import { services } from '@what-does-the-dude-say/factories';
import { ChannelCollection } from './channel-collection';

const { channels } = services();

export const ChannelsPage = () => {
  return (
    <main className="grid gap-8">
      <h1 className="text-5xl">Channels</h1>

      <ChannelCollection channels={channels} />
    </main>
  );
};
