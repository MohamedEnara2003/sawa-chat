import { Component, input, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-profile-links',
  imports: [SharedModule],
  template : `
    <nav aria-label="profile-links"  class="w-full"> 
    <ul class="w-full flex flex-wrap  justify-center items-center gap-5 sm:gap-10 
    capitalize text-background dark:text-white">
    @for (link of profileLinks(); track link) {
    <li>
    <a aria-label="profile-links" 
    [routerLink]="['/user-profile/', user_id()]"
    [queryParams]="{type : link}"
    routerLinkActive="text-sawa-primary border-b-1 border-b-sawa-primary pb-1"
    class="w-[20%] hover:text-sawa-primary duration-200">
    {{link}}
    </a>
    </li>
    }
    </ul>
    </nav>
  `,
  styles: ``
})
export class ProfileLinksComponent {
  readonly user_id = input.required<string>()
  profileLinks = signal<string[]>([
    "posts" , "about" , "photos" ,"videos"
    ])
}
