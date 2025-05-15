import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-cover',
  imports: [],
  template : `
  <picture aria-label="cover-photo" role="img" class="w-full">
  <img [src]="coverUrl" 
  alt="cover-photo" loading="lazy" class="size-full object-cover">
  </picture>
  `,
  styles: ``
})
export class ProfileCoverComponent {
  readonly coverUrl : string = "https://fpycbjhhzhzwuakxsdpx.supabase.co/storage/v1/object/public/images//unnamed.webp";
}
