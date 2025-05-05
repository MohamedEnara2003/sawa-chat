import { Component, inject} from '@angular/core';
import { UserImageComponent } from "../../user-image/user-image.component";
import { ProfileFollowStatsComponent } from "../components/profile-follow-stats/profile-follow-stats.component";
import { ProfileBioComponent } from "../components/profile-bio/profile-bio.component";
import { ProfileSkillsComponent } from "../components/profile-skills/profile-skills.component";
import { SharedModule } from '../../../modules/shared.module';
import { ProfileDetailsComponent } from "../components/profile-details/profile-details.component";
import { ProfileCoverComponent } from "../components/profile-cover/profile-cover.component";
import { UserStore } from '../../../../store/users/users.signal';

@Component({
  selector: 'app-profile-aside',
  imports: [
    SharedModule,
    UserImageComponent,
    ProfileFollowStatsComponent,
    ProfileBioComponent,
    ProfileSkillsComponent,
    ProfileDetailsComponent,
    ProfileCoverComponent
],
  template : `
  <div class="w-full flex justify-center items-center">
  <aside aria-label="profile-aside" class="flex flex-col justify-center items-center gap-5 my-2 w-full">
  
<header class="relative w-[95%] rounded-2xl h-130 flex flex-col justify-end items-center
bg-gradient-to-r dark:from-[#808080] dark:to-background from-background  to-overlay to-37%  from-0%
after:bg-tint after:absolute  after:bottom-0 after:w-full after:rounded-2xl after:h-[65%] after:z-5">

<div class="absolute top-0 w-full h-90 rounded-box flex justify-center 
items-start z-0 ">
<app-profile-cover class="size-full"/>
</div>

<div class="w-full h-[75%] flex flex-col justify-start items-center gap-4  z-20">

<div class="w-[95%] flex justify-between items-end ">
<app-profile-follow-stats class="w-20"
[statCount]="1984"
statLabel="follwers"
/>
<picture 
  class="size-32 outline-4 outline-background rounded-2xl ">
  <app-user-image [isRouteProfile]="true" imageClass="size-full object-cover rounded-2xl bg-white "/>
</picture>

<app-profile-follow-stats class="w-20"
[statCount]="100"
statLabel="following"
/>
</div>

<div class="w-full flex flex-col justify-center items-center gap-1"> 
<h2 class="text-white font-semibold capitalize line-clamp-1">{{userStore.user()?.fullName}}</h2>
<h3 class="text-overlay text-xs line-clamp-1">{{userStore.user()?.email}}</h3>
</div>

@if(userStore.user()?.bio){
<app-profile-bio class="w-[90%]" [bio]="userStore.user()?.bio!"/>
}

<a aria-label="btn-my-profile" [routerLink]="['/user-profile/',userStore.user()?.user_id]"
class="w-[80%] py-5 btn rounded-2xl btn-neutral  capitalize 
font-[400] text-white bg-gradient-to-b from-[#282828] to-overlay  ">
    my profile
</a>
</div>
</header>
<app-profile-details class="w-full" [details]="userStore.user()?.details!" >
<h1 title class="title-h1">details</h1>
</app-profile-details>
<app-profile-skills class="w-full" [skills]="userStore.user()?.skills!">
<h1 title class="w-full text-left  text-white font-semibold text-lg">Skills</h1>
</app-profile-skills>
</aside>
</div>
  `
})
export class ProfileAsideComponent {
  readonly userStore = inject(UserStore) ;
}
