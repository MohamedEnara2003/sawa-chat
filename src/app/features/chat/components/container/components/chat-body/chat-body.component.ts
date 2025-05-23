import { Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import { MessageStore } from '../../../../../../store/messages/message.signal';
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { DayJsService } from '../../../../../../core/services/day-js.service';
import { UserStore } from '../../../../../../store/users/users.signal';
import { ImageViewerStore } from '../../../../../../store/imageViewer/imageViewer.signal';
import { ChatStore } from '../../../../../../store/chats/chats.signal';


@Component({
  selector: 'app-chat-body',
  imports: [SharedModule],
  template : `
<div #chatContainer class="w-full  border-x-2 border-tint overflow-y-auto p-2 flex flex-col gap-5
  bg-background"
[ngClass]="chatStore.isChatFormFocus() ? 'h-[90vh] md:h-[80vh]' : 'h-[80vh]'"
style="scrollbar-width: none;"
role="log"
aria-label="Chat messages">
    @for (item of messageStore.messages(); track item) {
    <div class="chat" 
    [ngClass]="userStore.user()?.user_id === item.sender_id ? 'chat-end' : 'chat-start'"
    role="article"
    [attr.aria-label]="userStore.user()?.user_id === item.sender_id ? 'Your message' : 'Received message'">
    @defer (when !messageStore.isLoading()) {
    <div class="chat-bubble text-sm px-2"
    [ngClass]="userStore.user()?.user_id === item.sender_id ? 
    'bg-tint text-white' : 'bg-gray-300 text-background'">
    <div (click)="imageViewer.getImage(item.file_url! , true)" aria-label="container-chat-image" class="w-50  my-1"> 
    @if(item.file_url !== ''){
    <img  [src]="item.file_url" [alt]="item.file_name"  loading="lazy">
    }
    </div>
    @if(item.message !== ''){
    <p>{{item.message}}</p>
    }
    <div class="flex justify-end items-center text-xs">
    <span class="badge badge-xs badge-success text-background ">
    {{datJs.formatTime(item.created_at!)}}
    <i class="fa-solid fa-check" aria-hidden="true"></i>
    </span>
    </div>
    </div>
  }@placeholder {
  <div class="w-40 chat-bubble text-sm  bg-overlay animate-pulse "></div>
  }
    </div>
  }
</div>
  `
})
export class ChatBodyComponent  {
  readonly datJs = inject(DayJsService);
  readonly messageStore = inject(MessageStore);
  readonly userStore = inject(UserStore);
  readonly chatStore = inject(ChatStore);
  readonly imageViewer = inject(ImageViewerStore);
  chatContainer = viewChild<ElementRef<HTMLElement>>('chatContainer');

  constructor(){
  effect(() => {
    const chatContainer = this.chatContainer()?.nativeElement;
    if (chatContainer) {
      this.messageStore.getChatContanier(chatContainer);
    }
  })
}


}
