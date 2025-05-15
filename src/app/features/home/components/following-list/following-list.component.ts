import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FollowersStore } from '../../../../store/followers/followers.signal';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-following-list',
  imports: [
    SharedModule,
    UserImageComponent,
    
],
  template : `
<swiper-container 
aria-label="Swiper container "
#swiperRef
[speed]="200"
[breakpoints]="{'0': {slidesPerView: 5 },'540': {slidesPerView: 6 },'1024': { slidesPerView:7}}"
class="w-full">
  @for (following of followersStore.followingData(); track following) {
  @defer (when !followersStore.isLoading()) { 
    <swiper-slide role="slider"
    [routerLink]="['/user-profile/', following.following_id]">
    <div  class="w-12 flex flex-col justify-center items-center gap-1">
      @let userImage = following.following.avatar_url;
      <div class="w-full h-12  rounded-2xl border-2 border-sawa-primary ">
      <app-user-image [avatarUrl]="userImage" [isDefault]="userImage ? false : true"
      imageClass="size-full object-cover rounded-2xl hover:scale-105  duration-100  cursor-pointer"/>
      </div>
      <h2 class="text-overlay text-[10px] line-clamp-1 capitalize font-bold">
      {{following.following.fullName}}
      </h2>
      </div>
    </swiper-slide>
  }@placeholder {
    <li class="size-12 rounded-2xl bg-tint animate-pulse"></li>
  }
  }
  </swiper-container>
  `,
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class FollowingListComponent  {
  readonly followersStore = inject(FollowersStore);


}
