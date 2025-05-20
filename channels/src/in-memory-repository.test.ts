import { InMemoryChannelsRepository } from './in-memory-repository';

describe('in-memory-repository', () => {
  it('create', async () => {
    const repository = new InMemoryChannelsRepository();

    expect((await repository.items()).length).toStrictEqual(0);
  });

  it('create & add', async () => {
    const repository = new InMemoryChannelsRepository();

    await repository.add({ id: 'test', name: 'test' });

    expect((await repository.items()).length).toStrictEqual(1);
  });

  it('create & add & add', async () => {
    const repository = new InMemoryChannelsRepository();

    repository.add({ id: 'test', name: 'test' });
    repository.add({ id: 'test 2', name: 'test' });

    expect((await repository.items()).length).toStrictEqual(2);
  });

  it('create & add & add same', async () => {
    const repository = new InMemoryChannelsRepository();

    await repository.add({ id: 'test', name: 'test' });
    await repository.add({ id: 'test', name: 'test' });

    expect((await repository.items()).length).toStrictEqual(1);
  });
});
