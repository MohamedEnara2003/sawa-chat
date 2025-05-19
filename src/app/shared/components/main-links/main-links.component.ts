import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { LinksType } from '../../interfaces/links';
import { NotificationsStore } from '../../../store/notifications/notifications.signal';
import { LinkComponent } from "../link/link.component";

@Component({
  selector: 'app-main-links',
  imports: [SharedModule, LinkComponent],
  template : `
  <ul aria-label="Main Links"  role="list" 
  class="w-full flex justify-evenly  items-center  gap-5 text-white   px-1">
  @for (link of mainLinks(); track link) {
  <li  role="listitem"  [title]="link.linkName">
  <app-link linkClass="relative py-3 flex flex-col justify-center items-center hover:text-sawa-primary  
  duration-200 cursor-pointer" class="relative"
  routerLinkActive="linkActive"  [routerLink]="link.path">
  <i class="text-2xl " [ngClass]="link.iconName"></i>
  @if(link.id === 3 && notificationsStore.notificationsCount() > 0) {
  <span class="absolute top-1 -right-3 badge  badge-xs bg-red-500 text-white">
  {{notificationsStore.notificationsCount()}}
  </span>
  }
  </app-link>
  </li>
  }
  <ng-content/>
  </ul>
  `
})
export class MainLinksComponent {
  readonly notificationsStore = inject(NotificationsStore) 

  mainLinks = signal<LinksType[]>([
  {id : 1  ,path : '/home', linkName : 'home' , iconName : 'fa-solid fa-home'} ,
  {id : 2  ,path : '/profile/activity', linkName : 'profile' , iconName : 'fa-solid fa-user'} ,
  {id : 3  ,path : '/profile/notification', linkName : 'notification' , iconName : 'fa-solid fa-bell'} ,
  {id : 4  ,path : '/chat', linkName : 'chat' , iconName : 'fa-solid fa-comment'} ,
  {id : 5  ,path : '/settings', linkName : 'settings', iconName : 'fa-solid fa-gear'} ,
  ]).asReadonly()

}
