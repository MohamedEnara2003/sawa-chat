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
  <section class="w-full lg:h-[90vh]">
  <div class="size-full flex justify-evenly items-center gap-2 p-2">
  <aside class="hidden lg:h-full  lg:inline-block w-full lg:w-[30%] overflow-y-auto " 
    style="scrollbar-width: none;" >
    @defer (on viewport) {
    <app-profile-aside class="w-full h-full" />
    }@placeholder {
    <div class="w-full h-[80vh] rounded-2xl bg-tint"></div>
    }
  </aside>
  <article class="w-full md:w-[90%] lg:w-[40%] lg:h-full lg:overflow-y-auto 
    flex flex-col   gap-5 " style="scrollbar-width: none;">
    <app-add-post />
    <app-following-list /> 
    <app-post-status-links />
    @if(postStatus() === "public") {  
    <app-post [posts]="postsStore.publicPosts()"/>
    }
    @else if (postStatus() === "followers") {
    <app-post [posts]="postsStore.followingPosts()" />
    }
  </article>
  <aside class="hidden lg:inline-flex  lg:w-[25%] lg:h-[95%]   bg-tint  
    rounded-t-2xl shadow shadow-background  overflow-y-auto" style="scrollbar-width: none;">
    @defer (on viewport) {
    <app-notifications class="w-full"/>
    }@placeholder {
    <div class="w-full h-full  rounded-2xl bg-tint"></div>
    }
  </aside>
    </div>
    <app-link [routerLink]="['/']" 
    linkClass="fixed right-2 bottom-18 sm:bottom-2 size-8 bg-sawa-primary rounded-full  cursor-pointer
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
