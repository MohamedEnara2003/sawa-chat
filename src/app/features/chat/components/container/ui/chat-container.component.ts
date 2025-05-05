import { Component,  input } from '@angular/core';
import { ChatHeaderComponent } from "../components/chat-header/chat-header.component";
import { ChatBodyComponent } from "../components/chat-body/chat-body.component";
import { ChatFormComponent } from "../components/chat-form/chat-form.component";
import { LogoComponent } from "../../../../../shared/components/logo/logo.component";



@Component({
  selector: 'app-chat-container',
  imports: [ChatHeaderComponent, ChatBodyComponent, ChatFormComponent, LogoComponent],
  template : `
  <section class="w-full  h-full  flex flex-col justify-between items-center  ">
  
  @if(chatId()){
  <div class="w-full h-full">
  <app-chat-header class="w-full" />
  <app-chat-body   class="w-full" [chatId]="chatId()!"/>
  <app-chat-form   class="w-full" [chatId]="chatId()!"/>
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

export class ChatContainerComponent {
  chatId = input<string>();

}
