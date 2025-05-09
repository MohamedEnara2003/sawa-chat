import { Component,  effect,  inject,  input,  } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatBodyComponent } from "../components/chat-body/chat-body.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { LogoComponent } from "../../../../../shared/components/logo/logo.component";
import { MessageStore } from '../../../../../store/messages/message.signal';
import { selectRouteParams } from '../../../../../store/routes/router.selectors';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ChatStore } from '../../../../../store/chats/chats.signal';



@Component({
  selector: 'app-chat-container',
  imports: [ChatHeaderComponent, ChatBodyComponent, ChatFormComponent, LogoComponent],
  template : `
  <section class="w-full  h-full  flex flex-col justify-between  ">
  
  @if(chatId()){
  <div class="w-full h-full">
  <app-chat-header />
  <app-chat-body />
  <app-chat-form  [chatId]="chatId()!"/>
  </div>
  }@else {
  <div class="w-full h-full bg-tint rounded-2xl flex flex-col justify-center items-center gap-4">
  <app-logo  />
  <h1 class="text-center capitalize text-white ">
  Enjoy Fast and Easy Messaging with Your Friends Right from This Platform
  </h1>
  </div>
  }
  </section>
  `
})

export class ChatContainerComponent  {

  private readonly store = inject(Store);
  readonly messageStore = inject(MessageStore);
  readonly chatStore = inject(ChatStore);
  chatId = toSignal<string>(
    this.store.select(selectRouteParams).pipe(
    map((params) => params['chatId']!)
    )
  );
  constructor(){
  effect(() => {
  if(this.messageStore.chatContainer()){
  window.visualViewport?.addEventListener('resize', () => {
    this.messageStore.scrollChatContanierToBottom();
  });
  this.messageStore.scrollChatContanierToBottom();
  };
  const chatId = this.chatId();
  if(chatId){
  this.chatStore.getChat(chatId);
  }
  })

  const chatId = this.chatId();
  if(chatId){
  this.messageStore.getMessage(chatId);
  this.messageStore.initMessageRealTime(chatId);
  }

  }



}
