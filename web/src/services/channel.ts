import { type ReadonlySignal } from '@preact/signals';

export interface ChannelService {
  readonly name: ReadonlySignal<string | undefined>;
  readonly select: (channel: string) => void;
}
