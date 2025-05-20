import { Component, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-setting-links',
  imports: [SharedModule],
  template : `

  <aside aria-label="Nav side Setting links" 
  [class]="'fixed  lg:static w-[280px] lg:w-[25%] h-full bg-tint rounded-box flex flex-col justify-center items-center gap-2 text-gray-900 dark:text-white z-50 transition-transform duration-300 ' + 
    (isMenuOpen() ? 'translate-x-0' : '-translate-x-[150%] lg:translate-x-0')">
    <div class="w-[90%] flex flex-col gap-4">
      <label class="input input-neutral bg-[#212121] rounded-box">
      <svg class="size-5 opacity-50 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        <input type="search" 
          class="grow text-white bg-transparent placeholder:text-overlay" 
          placeholder="Search" />
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
            stroke="currentColor" class="size-6 text-overlay">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </span>
      </label>

      <ul class="w-full flex flex-col justify-center items-center gap-2">
        @for (link of settingLinks(); track link.id) {
          <li class="w-full">
            <a [routerLink]="['/settings', link.id]" 
              (click)="isMenuOpen() && toggleMenu()"
              class="w-full flex items-center gap-4 p-4 px-5 rounded-lg hover:bg-sawa-primary hover:text-background
              transition-colors duration-200 text-white">
              @if (link.iconName) {
                <i [class]="link.iconName" class="text-xl"></i>
              }
              <span class="text-lg">{{link.linkName }}</span>
            </a>
          </li>
        }
      </ul>
    </div>
  </aside>
  `,
})
export class SettingLinksComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  settingLinks = signal<LinksType[]>([
    {id :1 , linkName : 'Account' , iconName : 'fa-solid fa-user'} ,
    {id :2 , linkName : 'Apps and website' , iconName : 'fa-solid fa-globe'} ,
    {id :3 , linkName : 'Change Password' , iconName : 'fa-solid fa-key'} ,
    {id :4 , linkName : 'Activity log' , iconName : 'fa-solid fa-clock-rotate-left'} ,
    {id :5 , linkName : 'Privacy and Security' , iconName : 'fa-solid fa-shield-halved'} ,
    {id :6 , linkName : 'Others' , iconName : 'fa-solid fa-ellipsis'} ,
    {id :7 , linkName : 'Log Out' , iconName : 'fa-solid fa-right-from-bracket'} ,
  ]).asReadonly();
}
