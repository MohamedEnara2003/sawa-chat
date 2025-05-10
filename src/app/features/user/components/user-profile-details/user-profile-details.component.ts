import { Component, inject } from '@angular/core';
import { ProfileBioComponent } from "../../../../shared/components/profile-aside/components/profile-bio/profile-bio.component";
import { ProfileDetailsComponent } from "../../../../shared/components/profile-aside/components/profile-details/profile-details.component";
import { ProfileSkillsComponent } from "../../../../shared/components/profile-aside/components/profile-skills/profile-skills.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { UserStore } from '../../../../store/users/users.signal';

@Component({
  selector: 'app-user-profile-details',
  imports: [SharedModule,ProfileBioComponent, ProfileDetailsComponent, ProfileSkillsComponent],
  template : `
    <div class="w-full flex flex-col justify-center items-start gap-5">
    <div class="w-full flex flex-col justify-center items-start gap-1">
    <div title class="w-full flex justify-start items-center gap-2">
    <h1 class="title-h1">bio</h1>
    </div>
    <app-profile-bio [bio]="userStore.userProfile()?.bio!" />
    </div>
    <app-profile-details [details]="userStore.userProfile()?.details!" class="w-full">
    <h1 title class="title-h1">details</h1>
    </app-profile-details>
    @let skills = userStore.userProfile()?.skills ;
    @if(skills){
    <app-profile-skills class="w-full"  [skills]="skills">
    <h1 title class="title-h1">skills</h1>
    </app-profile-skills>
    }
    </div>
  `,
  styles: ``
})
export class UserProfileDetailsComponent {
  readonly userStore = inject(UserStore) ;
}
