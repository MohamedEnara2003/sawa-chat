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
<section aria-label="Home Page" class="w-full lg:h-[90vh] flex justify-center  overflow-hidden">
  <div class="size-full flex justify-center items-center   mb-12 sm:mb-0  gap-5   "> 

    <aside class="hidden lg:h-full  lg:inline-block w-full lg:w-[30%] overflow-y-auto p-4" 
    style="scrollbar-width: none;" >
    @defer (on viewport) {
    <app-profile-aside class="w-full h-full" />
    }@placeholder {
    <div class="w-full h-[80vh] rounded-2xl bg-tint"></div>
    }
    </aside>

    <article class="w-full md:w-[90%] lg:w-[40%] lg:h-full lg:overflow-y-auto 
    grid grid-cols-1 justify-items-center-safe  gap-5  
    my-1" style="scrollbar-width: none;">
    <app-add-post  class="w-full"/>
    <app-following-list class="w-full"/> 
    <app-post-status-links class="w-full"/>
    @if(postStatus() === "public") {  
    <app-post [posts]="postsStore.publicPosts()"/>
    }
    @else if (postStatus() === "followers") {
    <app-post [posts]="postsStore.followingPosts()" />
    }
    </article>

    <div class="hidden lg:inline-flex  lg:w-[25%] lg:h-[95%]   bg-tint  
    rounded-t-2xl shadow shadow-background p-4 overflow-y-auto" style="scrollbar-width: none;">
    @defer (on viewport) {
    <app-notifications class="w-full"/>
    }@placeholder {
    <div class="w-full h-full  rounded-2xl bg-tint"></div>
    }
    </div>

    <app-link [routerLink]="['/']" 
    linkClass="fixed right-2 bottom-18 sm:bottom-2 size-8 bg-sawa-primary rounded-full  cursor-pointer
    flex justify-center items-center shadow-md shadow-background border border-tint">
    <i class="fa-solid fa-angle-up text-background text-xl"></i>
    </app-link>
    </div>
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
