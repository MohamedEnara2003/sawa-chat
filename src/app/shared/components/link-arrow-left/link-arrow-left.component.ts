import { Component, inject } from '@angular/core';
import { SoundEffectStore } from '../../../store/sound/sound.signal';

@Component({
  selector: 'app-link-arrow-left',
  imports: [],
  template: `
      <a (click)="soundEffectStore.handlSoundEffect('sound-effects/pop.mp3')"
        class="z-10 btn-hover">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
            class="size-8 text-white">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
        </svg>
      </a>
  `,
  styles: ``
})
export class LinkArrowLeftComponent {
  readonly soundEffectStore = inject(SoundEffectStore);
}
