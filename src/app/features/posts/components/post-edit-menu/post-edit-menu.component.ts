import { Component, inject, input, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';
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
  @for (item of postLinks(); track $index) {
  <li (click)="menuLink(item.id)">
  <app-link>{{item.linkName}}</app-link>
  </li>
}
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
  
  postLinks = signal<LinksType[]>([
  {id : 1 , linkName : 'edit post' , iconName : 'fa-solid fa-edit'},
  {id : 2 , linkName : 'remove post',iconName : 'fa-solid fa-trash-can'},
  ])
  
  isOpenMenu =  signal<number>(0);

  menuLink(linkId : number) : void {
  if(this.isOpenMenu() === this.postId()){

  switch(linkId){ 
  case(1) :
  this.router.navigate(['/',{outlets :{'container' : 'create-post'}}])
  this.postsStore.openModlePostEdit(this.postId());
  break
  case(2) :
  this.postsStore.removePost(this.postId() , this.file_name())
  }
  this.isOpenMenu.set(0);
  }
  }
}
