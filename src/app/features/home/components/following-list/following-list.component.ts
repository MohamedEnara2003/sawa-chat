import { Component, inject, OnInit } from '@angular/core';
import { FollowersStore } from '../../../../store/followers/followers.signal';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-following-list',
  imports: [
  SharedModule ,
  UserImageComponent
  ],
  template : `
  <ul class="flex flex-wrap justify-start items-start gap-5">
  @for (following of followersStore.followingData(); track following) {
  @defer (when !followersStore.isLoading()) { 
    <li [routerLink]="['/user-profile/', following.following_id]"
    class="w-12 flex flex-col justify-center items-center gap-1">
      @let userImage = following.following.avatar_url;
      <div class="w-full h-12  rounded-2xl border-2 border-sawa-primary ">
      <app-user-image [avatarUrl]="userImage" [isDefault]="userImage ? false : true"
      imageClass="size-full object-cover rounded-2xl hover:scale-105  duration-100  cursor-pointer"/>
      </div>
      <h2 class="text-overlay text-[10px] line-clamp-1 capitalize font-bold">
      {{following.following.fullName}}
      </h2>
    </li>
  }@placeholder {
    <li class="size-12 rounded-2xl bg-tint animate-pulse"></li>
  }
  }
  </ul>
  `,
  styles: ``
})
export class FollowingListComponent implements OnInit{
  readonly followersStore = inject(FollowersStore);

  ngOnInit(): void {
    this.followersStore.getFollowingUsers();
  }
}
