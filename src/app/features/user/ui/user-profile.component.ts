import { Component, effect, inject,} from '@angular/core';
import { UserStore } from '../../../store/users/users.signal';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRouteParams } from '../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { UserImageComponent } from "../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../shared/modules/shared.module';
import { UserProfileCoverComponent } from "../components/user-profile-cover/user-profile-cover.component";
import { ProfileLinksComponent } from "../components/profile-links/profile-links.component";
import { UserProfileDetailsComponent } from "../components/user-profile-details/user-profile-details.component";
import { AddPostComponent } from "../../posts/components/add-post/add-post.component";
import { FollowersStore } from '../../../store/followers/followers.signal';


@Component({
  selector: 'app-user-profile',
  imports: [SharedModule, UserImageComponent, UserProfileCoverComponent, ProfileLinksComponent, UserProfileDetailsComponent, AddPostComponent],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent  {
  readonly userStore = inject(UserStore);
  readonly followersStore = inject(FollowersStore);
  private readonly store = inject(Store);
  
  userId = toSignal<string>(
  this.store.select(selectRouteParams).pipe(
  map((params) => params['userId'])
  )
  )

  constructor(){
  effect(() => {
    const userProfile_id =  this.userId();
    const user_id =  this.userStore.user_id();
    if(user_id && userProfile_id){
    this.followersStore.isUserFollowing(userProfile_id , user_id);
    }
  })
  this.userStore.getUserProfileByUserId(this.userId()!);
  }

}
