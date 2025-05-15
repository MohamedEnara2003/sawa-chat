import { Component, effect, inject,} from '@angular/core';
import { UserStore } from '../../../store/users/users.signal';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectQueryParams, selectRouteParams } from '../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ProfileLinksComponent } from "../components/profile-links/profile-links.component";
import { UserProfileDetailsComponent } from "../components/user-profile-details/user-profile-details.component";
import { FollowersStore } from '../../../store/followers/followers.signal';
import { UserProfileHeaderComponent } from "../components/user-profile-header/user-profile-header.component";
import { LinkArrowLeftComponent } from "../../../shared/components/link-arrow-left/link-arrow-left.component";
import { PostsProfileComponent } from "../components/posts-profile/posts-profile.component";
import { AboutProfileComponent } from "../components/about-profile/about-profile.component";
import { PhotosProfileComponent } from "../components/photos-profile/photos-profile.component";
import { Router } from '@angular/router';
import { VideosProfileComponent } from "../components/videos-profile/videos-profile.component";


@Component({
  selector: 'app-user-profile',
  imports: [
    SharedModule,
    ProfileLinksComponent,
    UserProfileDetailsComponent,
    UserProfileHeaderComponent,
    LinkArrowLeftComponent,
    PostsProfileComponent,
    AboutProfileComponent,
    PhotosProfileComponent,
    VideosProfileComponent
],
  template : `
  <section class="w-full lg:h-[90vh] animate-sideLeft flex flex-col  items-center  pb-10">

    <div class="w-full lg:w-[90%] h-full grid grid-cols-1 lg:grid-cols-2  gap-5  p-2 my-4">

    <div class="relative w-full flex flex-col  gap-5 bg-tint rounded-2xl lg:h-full p-4
    lg:overflow-y-auto" style="scrollbar-width: none;">
    <app-link-arrow-left [routerLink]="['/home']" class=" absolute left-2 top-2 z-10 btn-hover"/>
    <app-user-profile-header />
    <app-profile-links [user_id]="userId()!"/>
    <app-user-profile-details class="w-full bg-background rounded-2xl p-2 "/>
    </div>

    <div class="w-full flex flex-col  gap-5 lg:h-full lg:overflow-y-auto"style="scrollbar-width: none;">
    @switch (tap()) {
    @case ("posts") {
    <app-posts-profile/>
    }
    @case ("about") {
    <app-about-profile/>
    }
    @case ("photos") {
    <app-photos-profile />
    }
    @case ("videos") {
   <app-videos-profile/>
    }
    }
    </div>
    </div>
</section>
  `,
  styles: ``
})
export class UserProfileComponent {
  readonly userStore = inject(UserStore);
  readonly followersStore = inject(FollowersStore);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  
  userId = toSignal<string>(
  this.store.select(selectRouteParams).pipe(
  map((params) => {
  const userProfileId = params['userId'] 
  this.userStore.getUserProfileByUserId(userProfileId);
  return userProfileId
  })
  )
  )

  tap = toSignal<string>(
  this.store.select(selectQueryParams).pipe(
  map((queryParams) => queryParams['tap'])
  )
  )

  constructor(){
  effect(() => {
    const userProfile_id =  this.userId();
    const user_id = this.userStore.user_id();
    if(user_id && userProfile_id){
    this.router.navigate(['/user-profile/', userProfile_id],{queryParams : {tap : 'posts'}})
    this.followersStore.isUserFollowing(userProfile_id , user_id);
    this.userStore.getUserProfileByUserId(userProfile_id);
    }
  })
  }

}
