import * as tmi from 'tmi.js';

export const create = (channels: string[] = []) => {
  const client = new tmi.client({ channels });

  client.on('connected', (address: string, port: number) => {
    console.log(`* Connected to ${address}:${port}`);
  });

  client.on('disconnected', (reason: string) => {
    console.log(`* Disconnected with reason: ${reason}`);
  });

  return client;
};
