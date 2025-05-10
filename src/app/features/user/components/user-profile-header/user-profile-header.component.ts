import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { UserStore } from '../../../../store/users/users.signal';
import { FollowersStore } from '../../../../store/followers/followers.signal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ImageViewerStore } from '../../../../store/imageViewer/imageViewer.signal';
import { InteractionCountComponent } from "../../../../shared/components/profile-aside/components/interaction-count/interaction-count.component";
import { BtnComponent } from "../../../../shared/components/btn/btn.component";

@Component({
  selector: 'app-user-profile-header',
  imports: [UserImageComponent, SharedModule, InteractionCountComponent, BtnComponent],
  templateUrl: './user-profile-header.component.html',
  styles: ``
})
export class UserProfileHeaderComponent {
  readonly userStore = inject(UserStore);
  readonly followersStore = inject(FollowersStore);
  readonly imageViewerStore = inject(ImageViewerStore);
}
