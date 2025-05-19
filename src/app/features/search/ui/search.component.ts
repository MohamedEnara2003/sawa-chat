import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UserImageComponent } from '../../../shared/components/user-image/user-image.component';
import { UserStore } from '../../../store/users/users.signal';
import { LinkArrowLeftComponent } from "../../../shared/components/link-arrow-left/link-arrow-left.component";


@Component({
  selector: 'app-search',
  imports: [SharedModule, UserImageComponent, LinkArrowLeftComponent],
  template :`
  <section class="w-full h-[90vh] flex flex-col justify-start gap-5 p-4 items-center ">

  <div class="w-full flex justify-start items-center gap-2 p-2">
  <app-link-arrow-left [routerLink]="['/home']"/>

  <label class="w-100 input input-neutral bg-tint">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input #searchRef type="search" [ngModel]="userStore.serachValue()" 
  (ngModelChange)="userStore.onChangeSearchValue($event)"
  class="grow placeholder:text-overlay" placeholder="Search About Users" />
  </label>
  </div>
  
  <div class="w-full flex flex-col justify-center items-start gap-5 ">

  <ul class="w-full flex flex-col h-[80vh]  gap-2 overflow-y-auto" style="scrollbar-width: none;">
  @for (user of userStore.usersFilterSearch(); track user) {
  <li [routerLink]="['/user-profile/',user.user_id]"
  class="w-full flex gap-2 hover:bg-tint p-2 px-4  rounded-box duration-200 cursor-pointer">
  <div class="size-8 rounded-full">
  @let imageUser = user.avatar_url ;
  <app-user-image [avatarUrl]="imageUser!" [isDefault]="imageUser ? false : true"
  imageClass="size-full object-cover rounded-full" />
  </div>
  <h2 class="text-overlay font-bold capitalize text-sm">{{user.fullName}}</h2>
  </li>
  }
  </ul>
  </div>
  </section>
  `,
})
export class SearchComponent implements OnInit{
  readonly userStore = inject(UserStore);
  searchRef = viewChild<ElementRef<HTMLElement>>('searchRef');

  constructor(){
  this.userStore.LoadUsers();
  this.userStore.initRealTimeForUsers();
  }

  ngOnInit(): void {
    const searchRef = this.searchRef()?.nativeElement;
    if(searchRef){
    searchRef.focus()
    }
  }
}
