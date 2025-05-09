import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { NotificationsStore } from '../../../../store/notifications/notifications.signal';
import { PostsStore } from '../../../../store/posts/posts.signal';

@Component({
  selector: 'app-profile-header',
  imports: [SharedModule],
  template :`
      <header class="w-full">
    <ul class="w-full flex justify-between items-center  text-white capitalize my-1">
    @for (link of profileLinks(); track link) {
    <li  [routerLink]="['/profile/', link.name]" 
    routerLinkActive="text-sawa-primary border-b-2 border-b-sawa-primary " 
    class="w-[25%] relative flex justify-center items-center gap-1 text-[10px] xs:text-xs  sm:text-lg 
    md:text-xl py-2 cursor-pointer font-[300] hover:text-sawa-primary ">
    <a [attr.aria-label]="link.name" class="relative">
    {{link.name}}
    @if(link.statusCount){
    <span class="absolute -top-2  badge badge-xs badge-neutral bg-transparent 
    text-background dark:text-white border-1 border-background dark:border-white">
    {{link.statusCount}} 
    </span>
    }
    </a> 
  
    </li>
    }
    </ul>
    </header>
  `
})
export class ProfileHeaderComponent {
  private readonly notificationsStore = inject(NotificationsStore);
  private readonly postsStore = inject(PostsStore);
  profileLinks = linkedSignal<Array<{id : number , name : string , statusCount? : number}>>( () => [
    {id : 1 , name : 'activity' , statusCount : this.postsStore.activityCount() },
    {id : 2 , name : 'notification' , statusCount : this.notificationsStore.notificationsCount() },
    {id : 3 , name : 'display'},
    {id : 4 , name : 'apps'},
    ]);
  constructor(){
  effect(() => {
    console.log(this.postsStore.activityCount());
    
  })
  }
  
}
