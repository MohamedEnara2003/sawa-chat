import { Component, inject } from '@angular/core';
import { MessagesComponent } from "../components/messages/ui/messages.component";
import { ChatContainerComponent } from "../components/container/ui/chat-container.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRouteParams } from '../../../store/routes/router.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { SharedModule } from '../../../shared/modules/shared.module';


@Component({
  selector: 'app-chat',
  imports: [SharedModule , MessagesComponent, ChatContainerComponent],
  template : `
  <section aria-label="Chat Page" 
  class="w-full h-screen flex flex-wrap justify-around items-center   ">
  <app-messages class="w-full lg:w-[30%] h-full " [chatId]="chatId()"
  [ngClass]="!chatId() ? '' : 'hidden lg:inline-block'"/>
  <app-chat-container class="w-full h-full  lg:w-[65%]"
  [ngClass]="chatId() ? '' : 'hidden lg:inline-block'"
  />
  </section>
  `
})
export class ChatComponent {
  private readonly store = inject(Store);


  chatId = toSignal<string>(
  this.store.select(selectRouteParams).pipe(
  map((params) => params['chatId']!)
  )
  );

}
