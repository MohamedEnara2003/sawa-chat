import { Component,  inject } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MainLinksComponent } from "../main-links/main-links.component";
import { UserImageComponent } from "../user-image/user-image.component";
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRouteData } from '../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { SharedModule } from '../../modules/shared.module';
import { ResponsiveNavLinksComponent } from "../responsive-nav-links/responsive-nav-links.component";


@Component({
  selector: 'app-header',
  imports: [LogoComponent, MainLinksComponent, UserImageComponent, SharedModule, ResponsiveNavLinksComponent],
  template :`
  @if(!hideLayout()){ 
  <section class="w-full">
  <header class="w-full h-[10vh] flex justify-center items-center">

        <nav class="w-[95%] flex justify-between items-center   mt-2">
        
        <div class="flex justify-start items-center gap-5">
        <app-logo routerLink="/home"/>
        <a role="link" aria-label="link-search" routerLink="/search" 
        class="relative py-2 flex justify-center items-center btn-hover" routerLinkActive="linkActive">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
        class="size-7">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
        </a>
        </div>

        <app-main-links class="w-100 hidden md:inline-block "/>
        <a role="link" aria-label="link-profile" class="size-8 rounded-full">
        <app-user-image [isRouteProfile]="true"
        imageClass="size-full object-cover rounded-full shadow-md shadow-background border 
        border-tint btn-hover"/>
        </a>
        </nav>
</header>


  <app-responsive-nav-links  />


  </section>

}
  `
})
export class HeaderComponent {
  private readonly store = inject(Store) ;

  hideLayout = toSignal(
    this.store.select(selectRouteData).pipe(
      map((data) => !!data?.['hideLayout'])
    ),
    { initialValue: false }
  );
  
}
