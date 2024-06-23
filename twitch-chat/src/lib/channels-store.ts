import { computed, observable } from 'mobx';

export const create = () => {
  const channels$ = observable.set<string>([]);

  const asList$ = computed(() => {
    return Array.from(channels$.values());
  });

  return {
    getList: () => asList$.get(),
    add: (channel: string) => {
      channels$.add(channel);
    },
    remove: (channel: string) => {
      channels$.delete(channel);
    },
  };
};
