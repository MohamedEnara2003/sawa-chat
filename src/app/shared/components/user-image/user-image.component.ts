import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { UserStore } from '../../../store/users/users.signal';

@Component({
  selector: 'app-user-image',
  imports: [SharedModule],
  template : `
  @let userImage = userStore.user()?.avatar_url ;
  <img [routerLink]="isRouteProfile() ? ['/user-profile/', userStore.user_id()] : null" 
  class="bg-white" [ngClass]="imageClass()"
  [src]="avatarUrl() ? avatarUrl() : !isDefault() && userImage ? userImage : defaultImage" 
  alt="user image"
  loading="lazy">
  `
})
export class UserImageComponent {
  readonly userStore = inject(UserStore);
  defaultImage : string = "https://fpycbjhhzhzwuakxsdpx.supabase.co/storage/v1/object/public/users//user.webp";
  isDefault = input<boolean>(false);
  isRouteProfile = input<boolean>(false);
  avatarUrl = input<string>("");
  imageClass = input<string>();
}
