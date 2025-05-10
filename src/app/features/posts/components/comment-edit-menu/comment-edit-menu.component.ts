import { Component, inject, input, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';
import { Router } from '@angular/router';
import { CommentsStore } from '../../../../store/comments/comments.signal';
import { LinkComponent } from "../../../../shared/components/link/link.component";
import { BtnComponent } from "../../../../shared/components/btn/btn.component";

@Component({
    selector: 'app-comment-edit-menu',
    imports: [LinkComponent, BtnComponent],
    template : `
    <div class="flex flex-col justify-center items-center gap-1">
    <app-btn   role="button-edit-post"   btnType="button"
    (click)="isOpenMenu.set(isOpenMenu() === commentId() ? 0 : commentId())" >
    <i class="fa-solid fa-ellipsis  text-xl text-white btn-hover"></i>
    </app-btn>
    @if (isOpenMenu() === commentId()) {
    <nav class="relative z-50">
    <ul aria-label="post-menu-links" 
    class="menu absolute right-0  w-40 h-15 bg-background rounded-box  animate-opacity-up
    shadow-md shadow-background capitalize text-sm  border-1 border-overlay">
    @for (item of commentLinks(); track $index) {
    <li >
    <app-link >{{item.linkName}}</app-link >
    </li>
    }
    </ul>
    </nav>
}
</div>
`
})
export class CommentEditMenuComponent {
  readonly commentStore = inject(CommentsStore);
  readonly router = inject(Router);
  commentId = input.required<number>();
  commentLinks = signal<LinksType[]>([
    {id : 1 , linkName : 'remove'},
  ])
isOpenMenu =  signal<number>(0);
}
