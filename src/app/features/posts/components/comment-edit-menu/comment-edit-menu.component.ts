import { Component, inject, input, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';

import { Router } from '@angular/router';
import { CommentsStore } from '../../../../store/comments/comments.signal';

@Component({
    selector: 'app-comment-edit-menu',
    imports: [],
    template : `
    <div class="flex flex-col justify-center items-center gap-1">
    <button  (click)="isOpenMenu.set(isOpenMenu() === commentId() ? 0 : commentId())" 
    role="button-edit-post" type="button">
    <i class="fa-solid fa-ellipsis  text-xl text-white btn-hover"></i>
    </button>
    @if (isOpenMenu() === commentId()) {
    <nav class="relative z-50">
    <ul aria-label="post-menu-links" 
    class="menu absolute right-0  w-40 h-22 bg-background rounded-box  animate-opacity-up
    shadow-md shadow-background capitalize text-sm  border-1 border-overlay">
    @for (item of commentLinks(); track $index) {
    <li >
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
export class CommentEditMenuComponent {
  readonly commentStore = inject(CommentsStore);
  readonly router = inject(Router);
  commentId = input.required<number>();
    commentLinks = signal<LinksType[]>([
    {id : 1 , linkName : 'edit' , iconName : 'fa-solid fa-edit'},
    {id : 2 , linkName : 'remove',iconName : 'fa-solid fa-trash-can'},
    ])

isOpenMenu =  signal<number>(0);

}
