import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { PostComponent } from "../../ui/post.component";
import { PostsStore } from '../../../../store/posts/posts.signal';
import { PostsCommentsComponent } from "../posts-comments/posts-comments.component";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-post-viewer',
  imports: [PostComponent, PostsCommentsComponent],
  template : `
  <section class="w-full h-screen  fixed top-0 left-0  z-100 flex justify-center items-center">
  <div class="w-full sm:w-[70%] lg:w-1/2 h-full bg-tint flex flex-col  z-100 overflow-y-auto" 
  style="scrollbar-width: none;"> 
    <app-post [posts]="[postsStore.post()!]" >
        <a link-close-post (click)="postsStore.openPostViewer(undefined)"
        class="z-10 btn-hover">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
            class="size-8 text-white">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
        </svg>
        </a>
    </app-post>
    <app-posts-comments [post_user_id]="postsStore.post()?.user_id!"/>
    </div>

    <div (click)="postsStore.openPostViewer(undefined)" 
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
