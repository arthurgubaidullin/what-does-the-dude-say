import { InMemoryChannelsRepository } from './in-memory-repository';

describe('in-memory-repository', () => {
  it('create', () => {
    const repository = new InMemoryChannelsRepository();

    expect(repository.items().length).toStrictEqual(0);
  });

  it('create & add', () => {
    const repository = new InMemoryChannelsRepository();

    repository.add({ id: 'test', name: 'test' });

    expect(repository.items().length).toStrictEqual(1);
  });

  it('create & add & add', () => {
    const repository = new InMemoryChannelsRepository();

    repository.add({ id: 'test', name: 'test' });
    repository.add({ id: 'test 2', name: 'test' });

    expect(repository.items().length).toStrictEqual(2);
  });

  it('create & add & add same', () => {
    const repository = new InMemoryChannelsRepository();

    repository.add({ id: 'test', name: 'test' });
    repository.add({ id: 'test', name: 'test' });

    expect(repository.items().length).toStrictEqual(1);
  });
});
