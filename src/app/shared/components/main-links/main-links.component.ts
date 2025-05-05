import { Component, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { LinksType } from '../../interfaces/links';

@Component({
  selector: 'app-main-links',
  imports: [SharedModule],
  template : `
  <ul class="w-full flex justify-around sm:justify-evenly  items-center  text-white   ">
  @for (link of mainLinks(); track link) {
    <li >
  <a aria-label="home-link" [routerLink]="link.path" class="relative py-2 flex justify-center items-center"
  routerLinkActive="linkActive" >
  <i class="text-2xl  hover:text-sawa-primary  duration-200" [ngClass]="link.iconName"></i>
  </a>
  </li>
  }
  <ng-content/>
  </ul>
  `
})
export class MainLinksComponent {
  
  mainLinks = signal<LinksType[]>([
  {id : 1  ,path : '/home', linkName : 'home' , iconName : 'fa-solid fa-home'} ,
  {id : 2  ,path : '/profile', linkName : 'profile' , iconName : 'fa-solid fa-user'} ,
  {id : 3  ,path : '/profile/notification', linkName : 'notification' , iconName : 'fa-solid fa-bell'} ,
  {id : 4  ,path : '/profile/friends', linkName : 'notification' , iconName : 'fa-solid fa-users'} ,
  {id : 5  ,path : '/chat', linkName : 'chat' , iconName : 'fa-solid fa-comment'} ,
  {id : 6  ,path : '/settings', linkName : 'settings', iconName : 'fa-solid fa-gear'} ,
  ]).asReadonly()

}
