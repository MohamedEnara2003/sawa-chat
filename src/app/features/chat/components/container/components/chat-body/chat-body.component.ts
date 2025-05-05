import { Component, effect, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { MessageStore } from '../../../../../../store/messages/message.signal';
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { DayJsService } from '../../../../../../core/services/day-js.service';
import { UserStore } from '../../../../../../store/users/users.signal';

@Component({
  selector: 'app-chat-body',
  imports: [ SharedModule],
  template : `
<div #chatContainer class="w-full  h-[80vh] border-1 border-tint overflow-y-auto p-2 flex flex-col gap-5"
style="scrollbar-width: none;">
    @for (item of messageStore.messages(); track item) {
    <div class="chat" 
    [ngClass]="userStore.user()?.user_id === item.sender_id ? 'chat-end' : 'chat-start'">
    @defer (when !messageStore.isLoading()) {
    <div class="chat-bubble text-sm px-2"
    [ngClass]="userStore.user()?.user_id === item.sender_id ? 
    'bg-tint text-white' : 'bg-gray-300 text-background'">
    <div aria-label="container-chat-image" class="w-50  my-1"> 
    @if(item.file_url !== ''){
    <img [src]="item.file_url" [alt]="item.file_name"  loading="lazy">
    }
    </div>
    @if(item.message !== ''){
    <p>{{item.message}}</p>
    }
    <div class="flex justify-end items-center text-xs">
    <span class="badge badge-xs badge-success text-background ">
    {{datJs.formatTime(item.created_at!)}}
    <i class="fa-solid fa-check"></i>
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
export class ChatBodyComponent implements OnInit{
  readonly datJs = inject(DayJsService);
  readonly chatId = input.required<string>();
  readonly messageStore = inject(MessageStore);
  readonly userStore = inject(UserStore);
  chatContainer = viewChild<ElementRef<HTMLElement>>('chatContainer');

  constructor(){
    effect(() => {
    const chatContainer = this.chatContainer()?.nativeElement;
    const chatId = this.chatId();
    if(chatContainer && chatId){
    this.messageStore.getMessage(chatId , chatContainer);
    this.messageStore.initMessageRealTime(chatId);
    this.messageStore.scrollChatContanierToBottom();
    }
    })
  }

  ngOnInit(): void {
  this.messageStore.scrollChatContanierToBottom();
  }

}
