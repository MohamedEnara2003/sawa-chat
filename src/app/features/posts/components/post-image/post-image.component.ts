import { Component, inject, input } from '@angular/core';
import { CommentsStore } from '../../../../store/comments/comments.signal';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { SoundEffectStore } from '../../../../store/sound/sound.signal';
import { UserPostData } from '../../../../core/interface/posts';

@Component({
  selector: 'app-post-image',
  imports: [],
  template: `
      <picture aria-label="Post Image" role="img" (click)="
      soundEffectStore.handlSoundEffect('sound-effects/Post.mp3');
      postsStore.openPostViewer(post().id! , true); 
      commentsStore.openContainerComments(post()?.id! , false)"
      class="rounded-box w-full hover:opacity-90 duration-200 transition-opacity">
        <source [srcset]="post().file_url" media="(min-width: 1024px)" type="image/webp">
        <source [srcset]="post().file_url" media="(min-width: 768px)" type="image/webp">
        <img [src]="post().file_url"
        [alt]="'Post by ' + post().user.fullName"
        class="object-contain rounded-box shadow-background shadow-sm"
        loading="lazy"
        decoding="async">
      </picture>
  `,
})
export class PostImageComponent {
  post = input.required<UserPostData>();
  protected readonly commentsStore = inject(CommentsStore);
  protected readonly postsStore = inject(PostsStore);
  protected readonly soundEffectStore = inject(SoundEffectStore);
}
