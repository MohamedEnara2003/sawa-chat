import { Component, inject } from '@angular/core';
import { ChatStore } from '../../../../../../store/chats/chats.signal';
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { LinkArrowLeftComponent } from "../../../../../../shared/components/link-arrow-left/link-arrow-left.component";

@Component({
  selector: 'app-messages-header',
  imports: [SharedModule, LinkArrowLeftComponent],
  template : `
  <header class="w-full flex flex-col justify-center items-center gap-4 p-2">
    <div class="w-full flex justify-center items-center gap-2">
    <app-link-arrow-left routerLink="/" />
    <h1 class="w-full title-h1 text-left">Chats</h1>
    </div>

    <label class="w-full input input-neutral bg-[#212121] rounded-box">
        <svg class="size-5 opacity-50 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        <input type="search" [ngModel]="chatStore.vlaue()" (ngModelChange)="chatStore.onChangeValueFiltering($event)"
        class="grow text-white bg-transparent placeholder:text-overlay" 
        placeholder="Search"  />
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
        stroke="currentColor" class="size-6 text-overlay">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        </span>
    </label>
</header>
  `,
})
export class MessagesHeaderComponent {
  readonly chatStore = inject(ChatStore);
}
