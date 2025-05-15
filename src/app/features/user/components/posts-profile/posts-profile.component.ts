import { Component, inject } from '@angular/core';
import { AddPostComponent } from "../../../posts/components/add-post/add-post.component";
import { PostComponent } from "../../../posts/ui/post.component";
import { PostsStore } from '../../../../store/posts/posts.signal';

@Component({
  selector: 'app-posts-profile',
  imports: [AddPostComponent, PostComponent],
  template: `
    <main class="size-full flex flex-col justify-center gap-2" role="main">
      <section aria-label="Add new post">
        <app-add-post class="w-full"/>
      </section>
      <section aria-label="User posts">
        <h1 class="title-h1 p-2" id="posts-heading">Posts</h1>
        <div role="feed" aria-labelledby="posts-heading">
          <app-post [posts]="postsStore.myPosts()"/>
        </div>
      </section>
    </main>
  `,
  styles: ``
})
export class PostsProfileComponent {
  readonly postsStore = inject(PostsStore);
}
