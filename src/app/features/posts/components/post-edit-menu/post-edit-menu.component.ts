import { Component, inject, input, signal } from '@angular/core';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { Router } from '@angular/router';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-post-edit-menu',
  imports: [BtnComponent, LinkComponent],
  template : `
  <div class="flex flex-col justify-center items-center gap-1">
  <app-btn  aria-label="button-edit-post" btnType="button"
  (click)="isOpenMenu.set(isOpenMenu() === postId() ? 0 : postId())" >
  <i class="fa-solid fa-ellipsis  text-xl text-white btn-hover"></i>
  </app-btn>
  @if (isOpenMenu() === postId()) {
  <nav class="relative z-50">
  <ul aria-label="post-menu-links" 
  class="menu absolute right-0  w-40 h-22 bg-background rounded-box  animate-opacity-up
  shadow-md shadow-background capitalize text-sm  border-1 border-overlay">
  <li (click)="isOpenMenu.set(0)">
  <app-link (click)="openModlePostEdit()">edit post</app-link>
  <app-link (click)="removePost()">remove post</app-link>
  </li>
  </ul>
  </nav>
}
</div>
  `
})
export class PostEditMenuComponent {
  readonly postsStore = inject(PostsStore);
  readonly router = inject(Router);
  postId = input.required<number>();
  file_name = input.required<string>();
  isOpenMenu =  signal<number>(0);

  openModlePostEdit() : void {
  this.router.navigate(['/',{outlets :{'container' : 'create-post'}}])
  this.postsStore.openModlePostEdit(this.postId());
  }

  removePost() : void {
  this.postsStore.removePost(this.postId() , this.file_name());
  }


  
}
