import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { MessageStore } from '../../../../../../store/messages/message.signal';
import { ChatStore } from '../../../../../../store/chats/chats.signal';

@Component({
  selector: 'app-chat-form',
  imports: [SharedModule],
  templateUrl: './chat-form.component.html',
  styles: ``
})
export class ChatFormComponent {
  readonly messageStore = inject(MessageStore);
  private readonly chatStore = inject(ChatStore);
  chatId = input.required<string>();
  value = signal<string>('');
  chatFormRef = viewChild<ElementRef<HTMLInputElement>>('chatFormRef');

  onChangeValue(value : string) : void {
  this.value.set(value);
  }
  onUpLoadFile(event : Event) : void {
  const files = (event.target as HTMLInputElement).files;
  if(files && files.length > 0){
  this.messageStore.uploadFile(files[0]);
  }
  }

  addMessage() : void {
  const chatId = this.chatId();
  const receiver_id = this.chatStore.chat()?.user1_id.user_id!;

  if(this.value().length > 0  || this.messageStore.previewUrl() && chatId && receiver_id  ){
  this.messageStore.addMessage(chatId , this.value() , receiver_id);
  this.value.set('');
  this.chatFormRef()?.nativeElement.focus();
  }

  }
}
