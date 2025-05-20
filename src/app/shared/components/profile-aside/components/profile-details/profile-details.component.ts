import { Component, computed, input } from '@angular/core';
import { userDetails } from '../../../../../core/interface/user';

@Component({
  selector: 'app-profile-details',
  imports: [],
  template : `
  @if(details()){ 
  <nav aria-label="profile-details" class="w-full  flex flex-col gap-3">
  <ng-content title/>
  <ul class="w-full flex flex-col justify-start items-start text-white   gap-4 capitalize">
  @for (item of userDetalis(); track item) {
  @if (item.detals) { 
  <li>
  <a aria-label="locations" class="flex justify-center items-center gap-2">
  <h2 class="text-overlay font-semibold ">
  <i [class]="item.icon"></i>
  {{item.title}}   
  </h2> 
  {{item?.detals}}
  </a>
  </li>
  }
}
  </ul>
  </nav>
}
  `,
  styles: ``
})
export class ProfileDetailsComponent {
  details = input.required<userDetails>() ;
  userDetalis = computed(() => [
  {title : 'Works at',icon : 'fa-solid fa-briefcase' ,detals : this.details()?.work},
  {title : 'Gender' ,   icon : 'fa-solid fa-venus-mars' ,detals : this.details()?.gender},
  {title : 'From',  icon : 'fa-solid fa-location-dot' ,detals : this.details()?.address},
  ])
}
