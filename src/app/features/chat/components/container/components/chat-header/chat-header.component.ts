import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { ChatStore } from '../../../../../../store/chats/chats.signal';
import { ImageViewerStore } from '../../../../../../store/imageViewer/imageViewer.signal';
import { LinkArrowLeftComponent } from "../../../../../../shared/components/link-arrow-left/link-arrow-left.component";

@Component({
  selector: 'app-chat-header',
  imports: [UserImageComponent, SharedModule, LinkArrowLeftComponent],
  template : `
  <header aria-label="chat-heaer" 
class="w-full h-[10vh] bg-tint rounded-t-box flex justify-between items-center z-50 px-4 " 
[ngClass]="chatStore.isChatFormFocus() ? 'fixed md:relative top-0 left-0' : ''">
    <div class="flex justify-center items-center gap-2">
    <app-link-arrow-left routerLink="/chat"/>
    @let userImage = chatStore.chat()?.user1_id?.avatar_url ;
    <div class="size-10 rounded-box border-2 border-background"
    (click)="imageViewer.getImage(userImage! ,userImage ? true : false)">
        <app-user-image  [avatarUrl]="userImage!" [isDefault]="userImage ? false : true"
        imageClass="size-full  object-cover rounded-box"/> 
    </div>

    <div class="flex flex-col justify-center items-start gap-1 text-white ">
    <h1 class="font-semibold capitalize text-sm">{{chatStore.chat()?.user1_id?.fullName}}</h1>
    <h2 class="text-xs text-overlay">Active 1 min ago.</h2>
    </div>
    </div>
</header>
  `
})
export class ChatHeaderComponent {
  readonly chatStore = inject(ChatStore);
  readonly imageViewer = inject(ImageViewerStore);
}
