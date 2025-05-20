import type {
  ChannelsRepository,
  ChannelData,
} from '@what-does-the-dude-say/interfaces';
import { openDB, type DBSchema } from 'idb';

interface ChannelsDB extends DBSchema {
  channels: {
    value: ChannelData;
    key: string;
    indexes: { 'by-name': string };
  };
}

export class IdbChannelsRepository implements ChannelsRepository {
  async #db() {
    const db = await openDB<ChannelsDB>('Channels', 1, {
      upgrade(db) {
        const store = db.createObjectStore('channels', {
          keyPath: 'id',
          autoIncrement: false,
        });

        store.createIndex('by-name', 'name', { unique: true });
      },
    });
    console.log('Database opened.');
    return db;
  }

  async items(this: this): Promise<ReadonlyArray<ChannelData>> {
    const db = await this.#db();

    const items = await db.getAll('channels');

    return items;
  }

  async add(this: this, channelData: ChannelData): Promise<void> {
    const db = await this.#db();

    const tx = db.transaction('channels', 'readwrite', {
      durability: 'strict',
    });

    try {
      const currentChannelData = await tx
        .objectStore('channels')
        .get(channelData.id);

      if (currentChannelData !== undefined) {
        return;
      }

      await tx.objectStore('channels').add(channelData);

      tx.commit();
    } catch (error) {
      console.error(error);

      tx.abort();
    } finally {
      await tx.done;
    }
  }
}
