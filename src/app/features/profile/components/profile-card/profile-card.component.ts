import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';;
import { UserStore } from '../../../../store/users/users.signal';
import { ImageViewerStore } from '../../../../store/imageViewer/imageViewer.signal';
import { LinkComponent } from "../../../../shared/components/link/link.component";
import { LinkArrowLeftComponent } from "../../../../shared/components/link-arrow-left/link-arrow-left.component";

@Component({
  selector: 'app-profile-card',
  imports: [SharedModule, UserImageComponent, LinkComponent, LinkArrowLeftComponent],
  template : `
  
  <div class="size-full relative flex flex-col justify-center items-center overflow-hidden gap-5 capitalize ">
    <app-link-arrow-left class="absolute left-1 top-1" routerLink="/"/>
    <div (click)="imageViewer.getImage(userStore.user()?.avatar_url! , true)" 
    class="size-45 md:size-50  rounded-full   border-4 border-background ">
    <app-user-image imageClass="size-full rounded-full object-cover "/>
    </div>

    <div class="grid grid-cols-1 justify-items-center">
    <h1 class="text-white font-semibold text-xl ">{{userStore.user()?.fullName}}</h1>
    <h3 class="text-overlay text-center">{{userStore.user()?.bio}}</h3>
    </div>

    <app-link aria-label="profile-setup-link" 
    [routerLink]="['/',{outlets : {'profile-setup' : 'user'}}]"
    linkClass="btn-hover  btn px-8 btn-md md:btn-lg bg-sawa-primary btn-neutral text-background rounded-box">
    <svg class="size-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5429 4.11797C19.5429 4.11797 19.7154 7.07286 22.3222 9.67827C24.9289 12.2852 27.8822 12.4592 27.8822 12.4592L29.2726 11.0687C30.3786 9.96261 31 8.4624 31 6.89812C31 5.33384 30.3786 3.83363 29.2726 2.72752C28.1665 1.62141 26.6664 1 25.1022 1C23.538 1 22.0378 1.62141 20.9318 2.72752L19.5414 4.11797L16.0017 7.65784M27.8822 12.4577L19.9929 20.3504L15.3418 24.9987L15.1018 25.2402C14.2349 26.1057 13.8014 26.5392 13.3244 26.9112C12.7616 27.3505 12.1525 27.7272 11.5081 28.0346C10.9621 28.2941 10.3817 28.4876 9.21929 28.8746L4.29821 30.5155M4.29821 30.5155L3.09531 30.9175C2.81492 31.0115 2.51386 31.0255 2.22597 30.9578C1.93808 30.8901 1.67478 30.7434 1.46566 30.5343C1.25654 30.3252 1.1099 30.0619 1.04221 29.774C0.974515 29.4861 0.988465 29.185 1.08249 28.9046L1.48445 27.7016M4.29821 30.5155L1.48445 27.7016M1.48445 27.7016L3.12531 22.7803C3.51228 21.6178 3.70576 21.0374 3.96524 20.4914C4.27271 19.8464 4.64918 19.2374 5.08864 18.6749C5.46061 18.198 5.89407 17.7645 6.7595 16.899L10.7522 12.9077" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    Edit profile            
    </app-link>
  </div>
  `
})
export class ProfileCardComponent {
  readonly userStore = inject(UserStore);
  readonly imageViewer = inject(ImageViewerStore);
}
