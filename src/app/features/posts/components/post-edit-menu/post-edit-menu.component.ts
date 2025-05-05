import { Component, inject, input, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit-menu',
  imports: [],
  template : `
  <div class="flex flex-col justify-center items-center gap-1">
  <button  (click)="isOpenMenu.set(isOpenMenu() === postId() ? 0 : postId())" 
  role="button-edit-post" type="button">
  <i class="fa-solid fa-ellipsis  text-xl text-white btn-hover"></i>
  </button>
  @if (isOpenMenu() === postId()) {
  <nav class="relative z-50">
  <ul aria-label="post-menu-links" 
  class="menu absolute right-0  w-40 h-30 bg-background rounded-box  animate-opacity-up
  shadow-md shadow-background capitalize text-sm  border-1 border-overlay">
  @for (item of postLinks(); track $index) {
  <li (click)="menuLink(item.id)">
  <a >
  <i [class]="item.iconName"></i> <span>{{item.linkName}}</span>
  </a>
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
  
  postLinks = signal<LinksType[]>([
  {id : 1 , linkName : 'edit post' , iconName : 'fa-solid fa-edit'},
  {id : 2 , linkName : 'remove post',iconName : 'fa-solid fa-trash-can'},
  {id : 3 , linkName : 'save post',  iconName : 'fa-solid fa-bookmark'},
  ])
  
  isOpenMenu =  signal<number>(0);

  menuLink(linkId : number) : void {
  if(this.isOpenMenu() === this.postId()){

  switch(linkId){ 
  case(1) :
  this.postsStore.openModlePostEdit(this.postId());
  this.router.navigate(['/',{outlets :{'container' : 'create-post'}}])
  break
  case(2) :
  this.postsStore.removePost(this.postId())
  }
  this.isOpenMenu.set(0);
  }
  }
}
