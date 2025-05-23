import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { PostComponent } from "../../ui/post.component";
import { PostsStore } from '../../../../store/posts/posts.signal';
import { PostsCommentsComponent } from "../posts-comments/posts-comments.component";
import { DOCUMENT } from '@angular/common';
import { LinkArrowLeftComponent } from "../../../../shared/components/link-arrow-left/link-arrow-left.component";

@Component({
  selector: 'app-post-viewer',
  imports: [PostComponent, PostsCommentsComponent, LinkArrowLeftComponent],
  template : `
  <section class="w-full h-screen bg-background md:bg-transparent fixed top-0 left-0 z-100 flex justify-center items-center">
  <div class="w-full md:w-[70%] lg:w-[60%] h-full bg-tint grid grid-cols-1 z-100 overflow-y-auto " 
  style="scrollbar-width: none;"> 
    <app-post [posts]="[postsStore.post()!]">
    <app-link-arrow-left link-close-post (click)="postsStore.openPostViewer(undefined , false)"/>
    </app-post>
    <app-posts-comments [post_user_id]="postsStore.post()?.user_id!" class="h-[300px]"/>
    </div>

    <div (click)="postsStore.openPostViewer(undefined , false)" 
    class="w-full h-full fixed top-0 left-0 z-50 bg-background opacity-60">
    </div>
</section>
  `,
  styles: ``
})
export class PostViewerComponent implements OnDestroy{
  readonly postsStore = inject(PostsStore);
  constructor(@Inject(DOCUMENT) document : Document){
  document.body.style.overflow =  'hidden' ;
  }
  ngOnDestroy(): void {
  document.body.style.overflow = 'auto';
  }
}
