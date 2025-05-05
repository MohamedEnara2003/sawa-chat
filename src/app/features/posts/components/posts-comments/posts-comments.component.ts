import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommentsStore } from '../../../../store/comments/comments.signal';
import { DayJsService } from '../../../../core/services/day-js.service';
import { BtnLikeComponent } from "../btn-like/btn-like.component";
import { CommentEditMenuComponent } from "../comment-edit-menu/comment-edit-menu.component";


@Component({
  selector: 'app-posts-comments',
  imports: [SharedModule, UserImageComponent, BtnLikeComponent, CommentEditMenuComponent],
  templateUrl: './posts-comments.component.html',
  styles: ``
})
export class PostsCommentsComponent {
  readonly commentsStore = inject(CommentsStore);
  readonly dayJs = inject(DayJsService);
  commentValue = signal<string>('');
  commentsRef = viewChild<ElementRef<HTMLElement>>('commentsRef');
  post_user_id = input.required<string>()
  onChangeValue(value : string) : void {
  this.commentValue.set(value);
  }

  addComment() : void {
  if(this.commentValue().length >  1){
  this.commentsStore.addComment(this.commentValue() , this.post_user_id());
  this.commentValue.set('');
  const commentsRef = this.commentsRef()?.nativeElement ;
  if(commentsRef) commentsRef.scrollTop = commentsRef.scrollHeight;
  }
  }
}
