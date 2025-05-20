import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-post-status-links',
  imports: [SharedModule, LinkComponent],
  template : `
    <nav class="w-full">
    <ul class="w-full flex justify-evenly items-center capitalize md:text-lg text-white">
    <li [routerLink]="['/home/followers']" routerLinkActive=" after:w-full" 
    class="btn-hover relative pb-1   after:h-0.5 after:absolute after:bottom-0 after:left-0 
    after:bg-sawa-primary">
    <app-link >following</app-link >
    </li>
    <li [routerLink]="['/home/public']" routerLinkActive=" after:w-full" 
    class="btn-hover relative pb-1   after:h-0.5 after:absolute after:bottom-0 after:left-0 
    after:bg-sawa-primary">
    <app-link>for you</app-link >
    </li>
    </ul>
    </nav>
  `,
  styles: ``
})
export class PostStatusLinksComponent {

}
