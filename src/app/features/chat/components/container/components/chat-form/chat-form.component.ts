import { Component, inject, input, signal } from '@angular/core';
import { SharedModule } from '../../../../../../shared/modules/shared.module';
import { MessageStore } from '../../../../../../store/messages/message.signal';

@Component({
  selector: 'app-chat-form',
  imports: [SharedModule],
  templateUrl: './chat-form.component.html',
  styles: ``
})
export class ChatFormComponent {
  readonly messageStore = inject(MessageStore);
  chatId = input.required<string>();
  value = signal<string>('');
  
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
  const chatId = this.chatId() ;
  if(this.value().length > 1  || this.messageStore.previewUrl()  && chatId){
  this.messageStore.addMessage(chatId , this.value())
  this.value.set('');
  }

  }
}
