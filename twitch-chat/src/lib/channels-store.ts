import { action, computed, observable } from 'mobx';

export const create = () => {
  const channels$ = observable.set<string>([]);

  const asList$ = computed(() => {
    return Array.from(channels$.values());
  });

  return {
    getList: () => asList$.get(),
    add: action((channel: string) => {
      channels$.add(channel);
    }),
    remove: action((channel: string) => {
      channels$.delete(channel);
    }),
  };
};
