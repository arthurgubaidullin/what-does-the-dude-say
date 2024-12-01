import { type ReadonlySignal } from '@preact/signals';

interface SpeecherSignals {
  readonly active: ReadonlySignal<boolean>;
  readonly inActive: ReadonlySignal<boolean>;
}

export interface Speecher {
  readonly say: (message: string) => void;
  readonly activate: () => void;
  readonly deactivate: () => void;
}

export type SpeecherWithSignals = Speecher & SpeecherSignals;
