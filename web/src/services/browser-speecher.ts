import {
  computed,
  signal,
  type ReadonlySignal,
  type Signal,
} from '@preact/signals-core';
import { type Speecher, type SpeecherService } from './speecher';

export class BrowserSpeecher implements SpeecherService {
  #state: Signal<Speecher>;

  constructor() {
    this.#state = signal<Speecher>(
      new InActive((speecher) => {
        this.#state.value = speecher;
      }),
    );
  }

  say(message: string) {
    return this.#state.peek().say(message);
  }

  activate() {
    return this.#state.peek().activate();
  }

  deactivate() {
    return this.#state.peek().deactivate();
  }

  get active(): ReadonlySignal<boolean> {
    return computed(() => {
      return this.#state.value instanceof Active;
    });
  }

  get inActive() {
    return computed(() => !this.active.value);
  }
}

class InActive {
  constructor(
    private readonly transitionToState: (speecher: Speecher) => void,
  ) {}

  activate() {
    this.transitionToState(new Active(this.transitionToState));
  }

  deactivate() {
    return void 0;
  }
  say(this: this) {
    return void 0;
  }
}

class Active {
  constructor(
    private readonly transitionToState: (speecher: Speecher) => void,
  ) {}

  activate() {
    return void 0;
  }

  deactivate() {
    window.speechSynthesis.cancel();
    this.transitionToState(new InActive(this.transitionToState));
  }

  say(this: this, message: string) {
    const synth = window.speechSynthesis;

    const voices = synth.getVoices();

    const utterThis = new SpeechSynthesisUtterance(message);

    utterThis.onerror = (e) => {
      console.error(e.error);
    };

    const voice = voices[0];

    if (!voice) {
      return;
    }

    utterThis.lang = 'en';
    utterThis.voice = voice;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    utterThis.volume = 0.5;

    synth.speak(utterThis);
  }
}
