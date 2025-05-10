import { Component, inject, input } from '@angular/core';
import { UserImageComponent } from "../../../user-image/user-image.component";
import { SharedModule } from '../../../../modules/shared.module';
import { EditHeaderComponent } from "../edit-header/edit-header.component";
import { UserStore } from '../../../../../store/users/users.signal';
import { BtnComponent } from "../../../btn/btn.component";

@Component({
  selector: 'app-edit-profile-image',
  imports: [UserImageComponent, SharedModule, EditHeaderComponent, BtnComponent],
  templateUrl: './edit-profile-image.component.html',
  styles: ``
})
export class EditProfileImageComponent {
  readonly userStore = inject(UserStore);
  editType = input.required<string>();

  onFileSelected(event : Event) : void {
    const files = (event.target as HTMLInputElement).files ;
    if(files && files.length > 0) {
    const file = files[0];
    this.userStore.upLoadUserImage(file);
  }
}

}
