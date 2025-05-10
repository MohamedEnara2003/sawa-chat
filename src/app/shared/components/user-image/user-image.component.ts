import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { UserStore } from '../../../store/users/users.signal';
import { LinkComponent } from "../link/link.component";

@Component({
  selector: 'app-user-image',
  imports: [SharedModule, LinkComponent],
  template : `
  @let userImage = userStore.user()?.avatar_url ;
  <app-link>
  <img role="img" aria-label="user-image-link"
  [routerLink]="isRouteProfile() ? ['/user-profile/', userStore.user_id()] : null" 
  [ngClass]="imageClass()" class="cursor-pointer hover:opacity-80 duration-200"
  [src]="avatarUrl() ? avatarUrl() : !isDefault() && userImage ? userImage : defaultImage" 
  alt="user image"
  loading="lazy">
  </app-link>
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
