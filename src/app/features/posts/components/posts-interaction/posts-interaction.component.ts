import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommentsStore } from '../../../../store/comments/comments.signal';
import { LinkComponent } from "../../../../shared/components/link/link.component";
import { BtnComponent } from "../../../../shared/components/btn/btn.component";


@Component({
  selector: 'app-posts-interaction',
  imports: [SharedModule, LinkComponent, BtnComponent],
  template : `
    <nav class="relative w-full flex  justify-between items-center py-4  after:w-full after:h-0.5 
    after:absolute after:bg-white after:bottom-0 "> 
    <ul class="flex justify-center items-center gap-4 text-white">
  
    <li>
    <ng-content select="[btn-like]"/>
    </li>

    <li (click)="commentsStore.openContainerComments(postId() , true)">
    <app-link aria-label="icon-comments" linkClass="btn-hover flex justify-center items-center gap-0.5 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
    <span class=" text-sm text-white">
    {{commentsCount()}}
    </span>
    </app-link>
    </li>
    </ul>
    <app-btn title="save post" btnType="button"
    btnClass="btn btn-neutral bg-sawa-primary text-background font-bold capitalize
    rounded-box px-6  btn-sm">
    save
    </app-btn>
    </nav>
  `
})
export class PostsInteractionComponent {
  postId = input.required<number>();
  commentsCount = input.required<number>()
  readonly commentsStore = inject(CommentsStore)
}
