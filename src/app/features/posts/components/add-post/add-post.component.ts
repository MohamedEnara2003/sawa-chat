import { Component, inject } from '@angular/core';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { UserStore } from '../../../../store/users/users.signal';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-add-post',
  imports: [SharedModule, UserImageComponent, LinkComponent],
  template : `
  <section  class="w-full flex flex-col justify-center items-center bg-tint p-1 py-4
  rounded-2xl">
  <div class="w-full flex justify-between items-center bg-tint px-2 ">
  
  <div class="flex justify-start items-center gap-2">
  <picture [routerLink]="['/user-profile/', userStore.user()?.user_id]" 
  class="size-8 rounded-full shadow-sm shadow-background">
  <app-user-image 
    imageClass="size-8 object-cover rounded-full" 
    [isAboveFold]="true"
    loading="eager"
    fetchpriority="high"
  />
  </picture>

  <app-link aria-label="Link Open Modle Upsert Post" [routerLink]="['/',{outlets : {'container' : 'create-post'}}]" 
  linkClass="text-sm text-overlay hover:bg-[#333] p-1 duration-300 cursor-pointer">
  Tell your friends about your thoughts?
  </app-link>
  </div>

  <app-link [routerLink]="['/',{outlets : {'container' : 'create-post'}}]" 
  class="text-sm text-overlay p-1 duration-300 cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
  class="size-5 text-sawa-primary btn-hover" aria-hidden="true" loading="lazy">
  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
  </svg>
  </app-link> 

  </div>
  </section>
  `
})
export class AddPostComponent {
  readonly userStore = inject(UserStore);
  readonly postsStore = inject(PostsStore);
}
