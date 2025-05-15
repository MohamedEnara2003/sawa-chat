import { Component, inject, input, signal } from '@angular/core';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { Router } from '@angular/router';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-post-edit-menu',
  imports: [BtnComponent, LinkComponent],
  template: `
    <div class="flex flex-col justify-center items-center gap-1">
      <app-btn  
        ariaLabel="Open post menu" 
        btnType="button"
        (click)="isOpenMenu.set(isOpenMenu() === postId() ? 0 : postId())">
        <i class="fa-solid fa-ellipsis text-xl text-white btn-hover"></i>
      </app-btn>
      @if (isOpenMenu() === postId()) {
        <nav class="relative z-50" role="menu">
          <ul 
            aria-label="Post menu options"
            role="menu"
            class="menu absolute right-0 w-40 h-22 bg-background rounded-box animate-opacity-up
            shadow-md shadow-background capitalize text-sm border-1 border-overlay"
          >
            <li role="none">
              <app-link (click)="openModlePostEdit()" role="menuitem">Edit post</app-link>
            </li>
            <li role="none">
              <app-link (click)="removePost()" role="menuitem">Remove post</app-link>
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
  isOpenMenu = signal<number>(0);

  openModlePostEdit(): void {
    this.router.navigate(['/', {outlets: {'container': 'create-post'}}]);
    this.postsStore.openModlePostEdit(this.postId());
  }

  removePost(): void {
    this.postsStore.removePost(this.postId(), this.file_name());
  }
}