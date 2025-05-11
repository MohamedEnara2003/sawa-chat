import { Component, inject, input } from '@angular/core';
import { SoundEffectStore } from '../../../store/sound/sound.signal';

@Component({
  selector: 'app-btn',
  imports: [],
  template: `
  <button (click)="soundEffectStore.handlSoundEffect('sound-effects/link.wav')"
  [disabled]="disabled()"
  [type]="btnType()" [class]="btnClass()">
  <ng-content />
  </button>
  `,
  styles: ``
})
export class BtnComponent  {
  readonly soundEffectStore = inject(SoundEffectStore);
  btnClass = input<string>();
  btnType = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
}
