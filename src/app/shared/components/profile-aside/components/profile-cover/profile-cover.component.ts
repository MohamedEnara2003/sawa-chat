import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-cover',
  imports: [],
  template : `
  <picture aria-label="cover-photo" class="w-full">
  <img src="unnamed.png" 
  alt="cover-photo" loading="lazy" class="size-full object-cover">
  </picture>
  `,
  styles: ``
})
export class ProfileCoverComponent {
  
}
