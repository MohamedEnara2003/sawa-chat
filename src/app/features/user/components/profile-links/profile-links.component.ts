import { Component, input, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-profile-links',
  imports: [SharedModule, LinkComponent],
  template : `
    <nav aria-label="profile-links"  class="w-full"> 
    <ul class="w-full flex flex-wrap  justify-center items-center gap-5 sm:gap-10 text-white
    capitalize">
    @for (link of profileLinks(); track link) {
    <li>
    <app-link aria-label="profile-links" 
    [routerLink]="['/user-profile/', user_id()]"
    [queryParams]="{tap : link}"
    routerLinkActive="text-sawa-primary border-b-1 border-b-sawa-primary pb-1"
    linkClass="w-[20%] hover:text-sawa-primary duration-200  cursor-pointer">
    {{link}}
    </app-link>
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
