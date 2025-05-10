import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { ChatStore } from '../../../../../../store/chats/chats.signal';
import { ImageViewerStore } from '../../../../../../store/imageViewer/imageViewer.signal';
import { LinkArrowLeftComponent } from "../../../../../../shared/components/link-arrow-left/link-arrow-left.component";

@Component({
  selector: 'app-chat-header',
  imports: [UserImageComponent, SharedModule, LinkArrowLeftComponent],
  templateUrl: './chat-header.component.html',
  styles: ``
})
export class ChatHeaderComponent {
  readonly chatStore = inject(ChatStore);
  readonly imageViewer = inject(ImageViewerStore);
}
