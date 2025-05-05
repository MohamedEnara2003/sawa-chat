import { effect, Inject,  Injectable, signal } from '@angular/core';
import { LocaleStorgeService } from './locale-storge.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  readonly themeKay: string = "theme";
  private html!: HTMLElement;
  currentMode = signal<'dark' | 'light'>('dark');

  constructor(
    private localeStorage: LocaleStorgeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.html = this.document.documentElement;
    effect(() => {
      const savedTheme = this.localeStorage.getItem(this.themeKay);
      if (savedTheme) {
      if (savedTheme === 'dark' || savedTheme === 'light') {
      this.currentMode.set(savedTheme);
      }
        this.updateTheme(savedTheme);
      } else {
        this.updateTheme(this.currentMode());
      }
    })
  }

  onChangeDarkMode(mode : 'dark' | 'light'): void {
    const newMode = mode;
    this.currentMode.set(newMode);
    this.localeStorage.setItem(this.themeKay, newMode);
    this.updateTheme(newMode);
  }

  private updateTheme(mode: string): void {
  this.html.dataset['theme'] = mode ;
  }

}
