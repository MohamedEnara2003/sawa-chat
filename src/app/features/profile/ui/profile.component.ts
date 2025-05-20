import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ProfileHeaderComponent } from "../components/profile-header/profile-header.component";
import { ProfileCardComponent } from "../components/profile-card/profile-card.component";

@Component({
  selector: 'app-profile',
  imports: [SharedModule, ProfileHeaderComponent, ProfileCardComponent],
  template: `
    <main role="main" class="w-full  md:h-[90vh] grid grid-cols-1 md:grid-cols-3  mb-14 md:mb-0 gap-2 px-2">
    
      <aside class="col-span-1 md:h-full bg-tint rounded-2xl p-4 sm:p-4  mt-2">
        <app-profile-card />
      </aside>

      <article class="col-span-2 h-full md:overflow-y-auto flex flex-col gap-2 bg-tint rounded-2xl p-2 md:p-5 mt-2" 
              style="scrollbar-width: none;"
              aria-label="Profile Content">
        <app-profile-header />
        <router-outlet />
      </article>
    </main>
  `
})
export class ProfileComponent {

}
