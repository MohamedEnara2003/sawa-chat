import { Component, inject } from '@angular/core';
import { SoundEffectStore } from '../../../store/sound/sound.signal';

@Component({
  selector: 'app-link-arrow-left',
  imports: [],
  template: `
      <a role="link" aria-label="Link arrow left" 
      (click)="soundEffectStore.handlSoundEffect('sound-effects/pop.mp3')"
        class="z-10 btn-hover">
        <i class="fa-solid fa-angle-left text-2xl text-white"></i>
      </a>
  `,
  styles: ``
})
export class LinkArrowLeftComponent {
  readonly soundEffectStore = inject(SoundEffectStore);
}
