import { Component, inject} from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { ImageViewerComponent } from "../shared/components/image-viewer/image-viewer.component";
import { PostViewerComponent } from "../features/posts/components/post-viewer/post-viewer.component";
import { PostsStore } from '../store/posts/posts.signal';
import { UserStore } from '../store/users/users.signal';
import { HeaderComponent } from "../shared/components/header/header.component";
import { ErrorLoadUserComponent } from "../features/error/ui/error-load-user/error-load-user.component";

@Component({
  selector: 'app-main',
  imports: [SharedModule, ImageViewerComponent, PostViewerComponent, HeaderComponent, ErrorLoadUserComponent],
  template : `
  @defer (when userStore.user()) {
  <section> 
  <app-header class="w-full" />
  <router-outlet name="container" />
  <router-outlet name="profile-setup"/>
  <router-outlet name="comments"/>
  <router-outlet/>
  <app-image-viewer />
  @if(postsStore.isLoadPostViewer()){ 
  <app-post-viewer/>
  }
  </section>
  }@placeholder {
  <app-error-load-user/>
  }
  `,
})
export class MainComponent  {
  readonly postsStore = inject(PostsStore) ;
  readonly userStore = inject(UserStore) ;

}
