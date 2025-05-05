import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { ChatStore } from '../../../../../../store/chats/chats.signal';

@Component({
  selector: 'app-chat-header',
  imports: [UserImageComponent , SharedModule],
  templateUrl: './chat-header.component.html',
  styles: ``
})
export class ChatHeaderComponent {
  readonly chatStore = inject(ChatStore);
}
