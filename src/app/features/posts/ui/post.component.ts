import { Component, inject, input,  } from '@angular/core';
import { UserPostData } from '../../../core/interface/posts';
import { UserImageComponent } from "../../../shared/components/user-image/user-image.component";
import { DayJsService } from '../../../core/services/day-js.service';
import { PostsInteractionComponent } from "../components/posts-interaction/posts-interaction.component";
import { PostEditMenuComponent } from "../components/post-edit-menu/post-edit-menu.component";
import { UserStore } from '../../../store/users/users.signal';
import { PostsCommentsComponent } from "../components/posts-comments/posts-comments.component";
import { CommentsStore } from '../../../store/comments/comments.signal';
import { BtnLikeComponent } from "../components/btn-like/btn-like.component";
import { PostsLikesStore } from '../../../store/posts/likes.signal';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-post',
  imports: [
    SharedModule ,
    UserImageComponent,
    PostsInteractionComponent,
    PostEditMenuComponent,
    PostsCommentsComponent,
    BtnLikeComponent],
  template : `
  <ul class="w-full h-full flex flex-col gap-5 overflow-y-auto" style="scrollbar-width: none;"> 
  @for (post of posts(); track post) {
  @defer (on viewport) {
  <li class="relative w-full bg-tint flex flex-col justify-center items-center rounded-2xl ">
    <div class="w-full flex flex-col justify-start items-center  gap-2 my-5 px-4">
    <div class="w-full flex justify-between items-center ">
    <div class="flex flex-wrap justify-start items-center gap-3">
    <picture class="size-10 rounded-full shadow shadow-background">
    @let userImage = post.user.avatar_url;
    <app-user-image [avatarUrl]="userImage" [isDefault]="userImage ? false : true" 
    imageClass="size-10 ovject-cover rounded-full"/>
    </picture>

    <div class="flex flex-col justify-start items-start">
    <h1 class="text-white font-semibold capitalize text-lg">
    {{post.user.fullName!}}
    </h1>
    <h4 class="text-sawa-primary text-xs lowercase font-[300] flex justify-center items-center gap-1">
    {{dayJs.formatTime(post.created_at || '')}}

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-blue-400">
    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
    </svg>
    </h4>
    </div>
    </div>
    @if(post.user_id === userStore.user_id()){
    <app-post-edit-menu  [postId]="post.id!"/>
    }
    </div>

    <div class="w-full">
    <p class="text-overlay ">{{post.value}}</p>
    </div>
    @if(post.file_url){
    <picture class="w-full rounded-box" (dblclick)="onClickBtnLike(post)">
    <img [src]="post.file_url"
    alt="image-post" class="w-full object-cover rounded-box shadow-background shadow-sm">
    </picture>
    }

  <app-posts-interaction class="w-full" 
  [postId]="post.id!"
  [commentsCount]="post.comments_count?.count!">
  <app-btn-like btn-like [likesCount]="post.likes?.count!" [getIsLiked]="post.isLiked "
  (click)="onClickBtnLike(post)"/>
  </app-posts-interaction>
  
  </div>
  @if(commentsStore.isLoadComments()){
  <app-posts-comments [post_user_id]="post.user_id!"/>
  }
  </li>
  }@placeholder {
    <li class="w-full  flex flex-col justify-center items-start gap-2 ">
    <div class="w-full flex gap-2 items-center">
    <div class="size-10  bg-tint animate-pulse rounded-full"></div>
    <div class="w-30 h-2 bg-tint animate-pulse rounded-full"></div>
    </div>
    <div class="w-full h-80 bg-tint animate-pulse rounded-box"></div>
    </li>
  }
}
</ul>
  `
})
export class PostComponent {
  posts = input.required<UserPostData[]>();
  
  readonly dayJs = inject(DayJsService);
  readonly userStore = inject(UserStore);
  readonly commentsStore = inject(CommentsStore);
  readonly postsLikesStore = inject(PostsLikesStore);

  constructor(){
  this.commentsStore.initRealTimeForPostComment();
  }

  onClickBtnLike(post : UserPostData) : void {
  const post_id = post.id!;
  if(post_id)
  if(post.isLiked ){
  this.postsLikesStore.removePostLike(post_id) 
  }else{
    this.postsLikesStore.addPostLike(post_id); 
  }
  }

}
