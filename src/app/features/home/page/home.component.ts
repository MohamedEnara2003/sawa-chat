import { Component, inject } from '@angular/core';
import { ProfileAsideComponent } from "../../../shared/components/profile-aside/ui/profile-aside.component";
import { SharedModule } from '../../../shared/modules/shared.module';
import { PostsStore } from '../../../store/posts/posts.signal';
import { AddPostComponent } from "../../posts/components/add-post/add-post.component";
import { PostComponent } from "../../posts/ui/post.component";
import { FollowingListComponent } from "../components/following-list/following-list.component";
import { NotificationsComponent } from "../../notifications/ui/notifications.component";
import { PostStatusLinksComponent } from "../components/post-status-links/post-status-links.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectRouteParams } from '../../../store/routes/router.selectors';
import { LinkComponent } from "../../../shared/components/link/link.component";

@Component({
  selector: 'app-home',
  imports: [
    SharedModule,
    ProfileAsideComponent,
    AddPostComponent,
    PostComponent,
    FollowingListComponent,
    NotificationsComponent,
    PostStatusLinksComponent,
    LinkComponent
],
  template : `
<section class="w-full  flex flex-wrap justify-evenly  mt-5 mb-12 sm:mb-0 p-2 overflow-hidden">

    <div class="hidden lg:inline-flex w-full  lg:w-[30%]  " >
    <app-profile-aside class="w-full h-full" />
    </div>

    <div class="w-full md:w-[90%] lg:w-[40%] flex flex-col justify-center  gap-4 ">
    <app-following-list/> 
    <app-add-post />
    <app-post-status-links />
    @if(postStatus() === "public") {
    <app-post [posts]="postsStore.publicPosts()"  class="w-full lg:h-screen"/>
    }
    @else if (postStatus() === "followers") {
      <app-post [posts]="postsStore.followingPosts()" class="w-full lg:h-screen" />
    }
    </div>

    <div class="hidden lg:inline-flex  lg:w-[25%] h-screen bg-tint rounded-2xl shadow shadow-background p-4" >
    <app-notifications class="w-full h-full"/>
    </div>
    
  
    <app-link [routerLink]="['/']" 
    linkClass="fixed right-2 bottom-18 sm:bottom-2 size-8 bg-sawa-primary rounded-full 
    flex justify-center items-center shadow-md shadow-background border border-tint">
    <i class="fa-solid fa-angle-up text-background text-xl"></i>
    </app-link>
    
  </section>
  `
})
export class HomeComponent {
  readonly postsStore = inject(PostsStore);
  private readonly store = inject(Store);
  
  postStatus = toSignal<string>(
    this.store.select(selectRouteParams).pipe(
    map((params) => params['postStatus'])
    )
  );
  
}
