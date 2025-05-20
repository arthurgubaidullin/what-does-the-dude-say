import type { ChannelsRepository } from '@what-does-the-dude-say/interfaces';
import { Channels } from './channels-service';
import { InMemoryChannelsRepository } from './in-memory-repository';

describe('channels-service', () => {
  let repository: ChannelsRepository = new InMemoryChannelsRepository();

  beforeEach(() => {
    repository = new InMemoryChannelsRepository();
  });

  it('create', () => {
    const service = new Channels(repository);

    expect(service.items.peek().length).toStrictEqual(0);
  });

  it('create & add', async () => {
    const service = new Channels(repository);

    await service.add({ name: 'test' });

    expect(service.items.peek().length).toStrictEqual(1);
  });

  it('create & add & add', async () => {
    const service = new Channels(repository);

    await service.add({ name: 'test' });
    await service.add({ name: 'test 2' });

    expect(service.items.peek().length).toStrictEqual(2);
  });
});
