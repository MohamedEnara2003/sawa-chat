import { Component, effect, ElementRef, inject, input, linkedSignal, viewChild } from '@angular/core';
import { SharedModule } from '../../../../modules/shared.module';
import { EditHeaderComponent } from "../edit-header/edit-header.component";
import { UserStore } from '../../../../../store/users/users.signal';

@Component({
  selector: 'app-edit-profile-bio',
  imports: [SharedModule, EditHeaderComponent],
  templateUrl: './edit-profile-bio.component.html',
  styles: ``
})
export class EditProfileBioComponent {
  readonly userStore = inject(UserStore);
  editType = input.required<string>();
  inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');
  bio = linkedSignal<string>(() => this.userStore.user()?.bio!  ) ;
  constructor(){
  effect(() => {
  if(this.editType() === 'bio'){
  this.inputRef()?.nativeElement.focus()
  }
  })
  }
  
  onChangeValue(value : string) : void {
  this.bio.set(value) ;
  }
}
