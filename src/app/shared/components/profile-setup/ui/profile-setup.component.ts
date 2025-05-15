import { Component, ElementRef, inject, Inject, OnDestroy, signal, viewChild } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { DOCUMENT } from '@angular/common';
import { EditProfileImageComponent } from "../components/edit-profile-image/edit-profile-image.component";
import { EditProfileBioComponent } from "../components/edit-profile-bio/edit-profile-bio.component";
import { EditProfileDetailsComponent } from "../components/edit-profile-details/edit-profile-details.component";
import { EditProfileSkillsComponent } from "../components/edit-profile-skills/edit-profile-skills.component";
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectQueryParams } from '../../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { UserStore } from '../../../../store/users/users.signal';
import { LinkArrowLeftComponent } from "../../link-arrow-left/link-arrow-left.component";


@Component({
  selector: 'app-profile-setup',
  imports: [SharedModule, EditProfileImageComponent, EditProfileBioComponent, EditProfileDetailsComponent, EditProfileSkillsComponent, LinkArrowLeftComponent],
  template : `
<section class="w-full fixed top-0 left-0 h-screen flex justify-center items-end z-50">
<div aria-label="Container profile setup"  
class="w-[95%] sm:w-[70%] lg:w-1/2 h-[90%] bg-background shadow-md shadow-background z-50 rounded-t-box
flex flex-col gap-8 overflow-y-auto overflow-hidden animate-up px-5 py-5 pb-14">

<div class="w-full flex justify-between items-center">

<app-link-arrow-left aria-label="link-close-profile-edit" 
(click)="userStore.closeProfileEdit()" />

<h1 class="title-h1  text-background dark:text-overlay  text-center ">edit profile</h1>
</div>

<app-edit-profile-image [editType]="editType()!"/>
@if(editType() !== 'image' || !editType()) {
<app-edit-profile-bio [editType]="editType()!" />
<app-edit-profile-details #detailsContainer [editType]="editType()!"/>
<app-edit-profile-skills  #skillsContainer [editType]="editType()!"/>
}
</div>
<div (click)="userStore.closeProfileEdit()" 
class="size-full absolute left-0 top-0 bg-overlay  z-40 duration-200"
[ngClass]="editType() ? 'opacity-80' : 'opacity-50'">
</div>
</section>
  ` 
})
export class ProfileSetupComponent implements OnDestroy{

  skillsContainer = viewChild<ElementRef<HTMLElement>>('skillsContainer');

  readonly store = inject(Store);
  readonly userStore = inject(UserStore);
  isOverflow = signal<boolean>(true);
  editType = toSignal<string>(
  this.store.select(selectQueryParams).pipe(
  map(params => params['editType'])
  )
  )
  constructor(@Inject(DOCUMENT) document : Document){
  document.body.style.overflow =  'hidden' ;
  }
  ngOnDestroy(): void {
  document.body.style.overflow = 'auto';
  }
}
