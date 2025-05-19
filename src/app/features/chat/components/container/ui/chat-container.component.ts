import { Component,  effect,  inject, signal } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatBodyComponent } from "../components/chat-body/chat-body.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { LogoComponent } from "../../../../../shared/components/logo/logo.component";
import { MessageStore } from '../../../../../store/messages/message.signal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, map  } from 'rxjs';
import { ChatStore } from '../../../../../store/chats/chats.signal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-container',
  imports: [ChatHeaderComponent, ChatBodyComponent, ChatFormComponent, LogoComponent],
  template : `
  <section class="w-full  h-full  flex flex-col" role="region" aria-label="Chat container">
  
  @if(chatId()){
  <div class="w-full h-full grid grid-cols-1" role="main">
  <app-chat-header />
  <app-chat-body />
  <app-chat-form  [chatId]="chatId()!"/>
  </div>
  }@else {
  <div class="w-full h-full bg-tint rounded-2xl flex flex-col justify-center items-center gap-4 text-gray-900 dark:text-white" role="complementary" aria-label="Welcome message">
  <app-logo  />
  <h1 class="text-center capitalize text-white ">
  Enjoy Fast and Easy Messaging with Your Friends Right from This Platform
  </h1>
  </div>
  }
  </section>
  `
})

export class ChatContainerComponent {
  readonly messageStore = inject(MessageStore);
  readonly chatStore = inject(ChatStore);
  chatId = signal<string>('');

  constructor(private route : ActivatedRoute){
  effect(() => {
  this.messageStore.scrollChatContanierToBottom();
  })
  this.chatStore.getChats();
  this.getChatId();
  }

  private getChatId() : void {
    this.route.paramMap.pipe(
    map((paramsMap) => {
    const chatId = paramsMap.get('chatId');
    if(chatId) {
    this.chatStore.getChat(chatId);
    this.chatId.set(chatId);
    this.messageStore.getMessage(chatId);
    this.messageStore.initMessageRealTime(chatId);
    return chatId
    }
    else return EMPTY
    }), takeUntilDestroyed()
    ).subscribe()
  }
  
}
