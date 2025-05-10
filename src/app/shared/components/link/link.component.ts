import { Component, inject, input } from '@angular/core';
import { SoundEffectStore } from '../../../store/sound/sound.signal';

@Component({
  selector: 'app-link',
  imports: [],
  template : `
    <a (click)="soundEffectStore.handlSoundEffect('sound-effects/link.wav')"
    aria-label="link" role="link" [class]="linkClass()">
    <ng-content />
    </a>
  `,
  styles: ``
})
export class LinkComponent {
  readonly soundEffectStore = inject(SoundEffectStore);
  linkClass = input<string>()
}
