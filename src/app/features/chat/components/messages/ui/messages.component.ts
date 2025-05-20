import { Component, inject, input } from '@angular/core';
import { MessagesHeaderComponent } from "../components/messages-header/messages-header.component";
import { UserImageComponent } from "../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ChatStore } from '../../../../../store/chats/chats.signal';
import { MainLinksComponent } from "../../../../../shared/components/main-links/main-links.component";
import { MessageStore } from '../../../../../store/messages/message.signal';

@Component({
  selector: 'app-messages',
  imports: [
    SharedModule,
    MessagesHeaderComponent,
    UserImageComponent,
    MainLinksComponent
  ],
  template: `
    <aside aria-label="Messages" class="w-full h-full bg-tint p-5 flex flex-col justify-start gap-5 rounded-2xl">
      <app-messages-header />
      <nav aria-label="Chat list" class="w-full h-[90%]">
        <ul class="w-full h-full flex flex-col gap-4 overflow-y-auto" style="scrollbar-width: none;" role="list">
          @for (chat of chatStore.chatsFiltering(); track chat.id) {
            <li [routerLink]="['/chat/', chat.id]"
                class="w-full flex justify-between items-center rounded-box p-2 
                cursor-pointer hover:bg-sawa-primary/80  hover:text-black duration-200"
                [ngClass]="chatId() === chat.id ? 'bg-sawa-primary/80 text-black' : 'text-white'"
                role="listitem"
                [attr.aria-current]="chatId() === chat.id ? 'page' : null">
              <div class="flex justify-center items-center gap-4">
                @let userImage = chat.user1_id.avatar_url;
                <picture>
                  <app-user-image [avatarUrl]="userImage" 
                                [isDefault]="userImage ? false : true"
                                imageClass="size-12 object-cover rounded-full"
                                [attr.alt]="chat.user1_id.fullName + ' profile picture'"/>
                </picture>
                <div class="flex flex-col justify-center items-start">
                  <h2 class="font-semibold">{{chat.user1_id.fullName}}</h2>
                  <p class="text-overlay text-xs">last message</p>
                </div>
              </div>
              <span aria-hidden="true"><i class="fa-solid fa-message text-overlay"></i></span>
            </li>
          }
        </ul>
      </nav>
      <app-main-links class="w-full"/>
    </aside>
  `
})
export class MessagesComponent {
  readonly chatStore = inject(ChatStore);
  readonly messagesStore = inject(MessageStore);
  chatId = input<string>();

  constructor() {
  this.chatStore.getChats();
  }
}
  