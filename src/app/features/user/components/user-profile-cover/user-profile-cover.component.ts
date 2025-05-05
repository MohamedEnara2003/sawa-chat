import { Component } from '@angular/core';
import { ProfileCoverComponent } from "../../../../shared/components/profile-aside/components/profile-cover/profile-cover.component";

@Component({
  selector: 'app-user-profile-cover',
  imports: [ProfileCoverComponent],
  template : `
    <div aria-label="profile-cover" class="relative w-full h-[40vh] bg-tint flex justify-center items-start rounded-box 
    overflow-hidden">
        <app-profile-cover />
    </div>
  `,
  styles: ``
})
export class UserProfileCoverComponent {

}
