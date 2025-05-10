import { Component, inject, input } from '@angular/core';
import { MessagesHeaderComponent } from "../components/messages-header/messages-header.component";
import { UserImageComponent } from "../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ChatStore } from '../../../../../store/chats/chats.signal';


@Component({
  selector: 'app-messages',
  imports: [
  SharedModule ,
  MessagesHeaderComponent,
  UserImageComponent
  ],

  template :`
  <aside aria-label="Messages" class="w-full h-full bg-tint  p-5 flex flex-col justify-start
  gap-5 rounded-2xl">

  <app-messages-header />

  <section class="w-full h-[90%] overflow-y-auto" style="scrollbar-width: none;">
  <ul class="w-full flex flex-col justify-center items-center gap-4">
    @for (chat of chatStore.chats(); track chat.id) {
    <li [routerLink]="['/chat/' , chat.id]"
    class="w-full flex justify-between items-center rounded-box p-2  
    cursor-pointer hover:bg-background duration-200"
    [ngClass]="chatId() === chat.id ? 'bg-background' : ''">
    <div class="flex justify-center items-center gap-4">
    @let userImage = chat.user1_id.avatar_url ;
    <picture>
    <app-user-image [avatarUrl]="userImage" [isDefault]="userImage ? false : true"
    imageClass="size-12 object-cover rounded-full"/>
    </picture>
    <div class="flex flex-col justify-center items-start">
    <h1 class="font-semibold ">{{chat.user1_id.fullName}}</h1>
    <h1 class="text-overlay text-xs">last message</h1>
    </div>
    </div>
    <span><i class="fa-solid fa-message text-overlay"></i></span>
    </li>
    }

  </ul>
  </section>
  </aside>
  ` 
})
export class MessagesComponent {
  readonly chatStore = inject(ChatStore);
  chatId = input<string>();

}
  