import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-post-status-links',
  imports: [SharedModule],
  template : `
    <nav class="w-full">
    <ul class="w-full flex justify-evenly items-center capitalize md:text-lg">
    <li >
    <a [routerLink]="['/home/followers']" routerLinkActive=" after:w-full"
    class="btn-hover relative pb-1   after:h-0.5 after:absolute after:bottom-0 after:left-0 
    after:bg-white">
    following</a>
    </li>
    <li >
    <a [routerLink]="['/home/public']"  routerLinkActive="after:w-full"
    class="btn-hover relative pb-1   after:h-0.5 after:absolute after:bottom-0 after:left-0 
    after:bg-white ">
      for you
    </a>
    </li>
    </ul>
    </nav>
  `,
  styles: ``
})
export class PostStatusLinksComponent {

}
