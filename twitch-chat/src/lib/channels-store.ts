import { observable } from 'mobx';

export const create = () => {
  return observable.set<string>([]);
};
