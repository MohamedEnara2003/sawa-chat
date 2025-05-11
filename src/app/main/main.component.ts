import { Component, inject} from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { FollowersStore } from '../store/followers/followers.signal';
import { ImageViewerComponent } from "../shared/components/image-viewer/image-viewer.component";
import { PostViewerComponent } from "../features/posts/components/post-viewer/post-viewer.component";
import { PostsStore } from '../store/posts/posts.signal';
import { ChatStore } from '../store/chats/chats.signal';

@Component({
  selector: 'app-main',
  imports: [SharedModule, ImageViewerComponent, PostViewerComponent],
  template : `
  <section> 
  <router-outlet name="container" />
  <router-outlet name="profile-setup"/>
  <router-outlet name="comments"/>
  <router-outlet/>
  <app-image-viewer />
  @if(postsStore.isLoadPostViewer()){ 
  <app-post-viewer/>
  }
  </section>
  `,
})
export class MainComponent  {
  private readonly followersStore = inject(FollowersStore) ;
  readonly postsStore = inject(PostsStore) ;
  readonly chatStore = inject(ChatStore)

  constructor(){
  this.chatStore.getChats();
  this.chatStore.initRealTimeForChats();
  this.followersStore.getFollowingUsers();
  this.followersStore.getFollowers();
  this.postsStore.getPublicPosts();
  this.postsStore.getFollowingPosts();
  this.followersStore.initRealTime();
  this.postsStore.initRealTimeForPosts();
  }


  
}
