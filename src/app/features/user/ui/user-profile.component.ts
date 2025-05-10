import { Component, effect, inject,} from '@angular/core';
import { UserStore } from '../../../store/users/users.signal';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectQueryParams, selectRouteParams } from '../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ProfileLinksComponent } from "../components/profile-links/profile-links.component";
import { UserProfileDetailsComponent } from "../components/user-profile-details/user-profile-details.component";
import { AddPostComponent } from "../../posts/components/add-post/add-post.component";
import { FollowersStore } from '../../../store/followers/followers.signal';
import { UserProfileHeaderComponent } from "../components/user-profile-header/user-profile-header.component";
import { PostsStore } from '../../../store/posts/posts.signal';
import { PostComponent } from "../../posts/ui/post.component";
import { LinkArrowLeftComponent } from "../../../shared/components/link-arrow-left/link-arrow-left.component";


@Component({
  selector: 'app-user-profile',
  imports: [
    SharedModule,
    ProfileLinksComponent,
    UserProfileDetailsComponent,
    AddPostComponent,
    UserProfileHeaderComponent,
    PostComponent,
    LinkArrowLeftComponent
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
    @if(type() === "posts" || !type()){
    <app-add-post class="w-full"/>
    <h1 class="title-h1 ">posts</h1>
    <app-post [posts]="postsStore.myPosts()"/>
  }
    </div>
    </div>

</section>
  `,
  styles: ``
})
export class UserProfileComponent  {
  readonly userStore = inject(UserStore);
  readonly followersStore = inject(FollowersStore);
  readonly postsStore = inject(PostsStore);
  private readonly store = inject(Store);
  
  userId = toSignal<string>(
  this.store.select(selectRouteParams).pipe(
  map((params) => params['userId'])
  )
  )

  type = toSignal<string>(
  this.store.select(selectQueryParams).pipe(
  map((queryParams) => queryParams['type'])
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
