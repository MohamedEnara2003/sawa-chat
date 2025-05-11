import { Component, effect, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { UserStore } from './store/users/users.signal';
import { SoundEffectStore } from './store/sound/sound.signal';
import { timer } from 'rxjs';
import { LogoComponent } from "./shared/components/logo/logo.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  readonly userStore = inject(UserStore);
  readonly soundEffectStore = inject(SoundEffectStore);
  audioEle = viewChild<ElementRef<HTMLAudioElement>>('audioEle');
  isIntro = signal<boolean>(true);

  constructor(){
  effect(() => {
    const audioEle = this.audioEle()?.nativeElement;
    if(audioEle){
    this.soundEffectStore.initSoundEffect(audioEle);
    }
  })
  }
  ngOnInit(): void {
  this.userStore.LoadUser();
  timer(1500).subscribe(() => this.isIntro.set(false));
  }
}
