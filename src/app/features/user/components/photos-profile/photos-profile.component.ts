import { Component, inject } from '@angular/core';
import { UserStore } from '../../../../store/users/users.signal';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { ImageViewerStore } from '../../../../store/imageViewer/imageViewer.signal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-photos-profile',
  imports: [SharedModule, UserImageComponent, LinkComponent],
  template: `
    <section class="size-full flex flex-col justify-center gap-4" aria-label="User photos gallery">
      <h2 class="text-2xl font-semibold text-white" id="photos-heading">Photos</h2>
      @let avatarUrl = userStore.userProfile()?.avatar_url!;
      @if(avatarUrl && postsStore.postsImages().length >= 1) { 
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4" role="grid" aria-labelledby="photos-heading">
          @if (avatarUrl) {
            <figure class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <div aria-label="Profile image" (click)="imageViewerStore.getImage(avatarUrl, true)"
              class="size-50">
                <app-user-image 
                  [avatarUrl]="avatarUrl" 
                  [isDefault]="avatarUrl ? true : false"
                  imageClass="size-full object-cover" 
                />
              </div>
            </figure>
          }

          @for (image of postsStore.postsImages(); track image) {
            @if(image) { 
              <figure class="aspect-square rounded-lg overflow-hidden cursor-pointer 
              hover:opacity-90 transition-opacity">
                <div aria-label="Post image" (click)="imageViewerStore.getImage(image, true)"
                class="size-50">
                  <app-link class="w-full h-full">
                    <img 
                      [src]="image" 
                      [alt]="'Post image ' + ($index + 1)"
                      class="size-full object-cover" 
                      loading="lazy"
                    >
                  </app-link>
                </div>
              </figure>
            }
          }
        </div>
      } @else {
        <p class="text-sawa-primary" role="status">No photos available!</p>
      }
    </section>
  `,
  styles: ``
})
export class PhotosProfileComponent {
  readonly userStore = inject(UserStore);
  readonly postsStore = inject(PostsStore);
  readonly imageViewerStore = inject(ImageViewerStore);
}
