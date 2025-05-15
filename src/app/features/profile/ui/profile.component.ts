import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ProfileHeaderComponent } from "../components/profile-header/profile-header.component";
import { ProfileCardComponent } from "../components/profile-card/profile-card.component";


@Component({
  selector: 'app-profile',
  imports: [SharedModule, ProfileHeaderComponent, ProfileCardComponent ],
  template :`
<section class="w-full md:h-[90vh] flex flex-wrap  justify-evenly items-start  mb-14 md:mb-0  gap-4">
<app-profile-card class="w-[95%] md:w-[30%] md:h-full bg-tint rounded-2xl p-4 sm:p-4 mt-5 text-gray-900 dark:text-white"/>

<div class="w-[95%] md:w-[65%] md:h-full md:overflow-y-auto  flex flex-col  gap-2  bg-tint  rounded-2xl 
mt-5  p-2 md:p-5" style="scrollbar-width: none;">
<app-profile-header />
<router-outlet />
</div>
</section>
  `
})
export class ProfileComponent {}
