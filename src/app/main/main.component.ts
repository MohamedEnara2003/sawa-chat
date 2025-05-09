import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { FollowersStore } from '../store/followers/followers.signal';
import { timer } from 'rxjs';
import { LogoComponent } from "../shared/components/logo/logo.component";
import { ChatStore } from '../store/chats/chats.signal';
import { ImageViewerComponent } from "../shared/components/image-viewer/image-viewer.component";
import { PostViewerComponent } from "../features/posts/components/post-viewer/post-viewer.component";
import { PostsStore } from '../store/posts/posts.signal';



@Component({
  selector: 'app-main',
  imports: [SharedModule, LogoComponent, ImageViewerComponent, PostViewerComponent],
  template : `
  <section> 
  <router-outlet name="container" />
  <router-outlet name="profile-setup"/>
  <router-outlet name="comments"/>
  <router-outlet/>
  <app-image-viewer />
  @if(postsStore.post()){ 
  <app-post-viewer/>
  }
  </section>

@if(isIntro()){

<section class="w-full h-screen fixed top-0 left-0 bg-background 
flex justify-center items-center z-100 ">
  <div class="animate-opacity-up">
  <app-logo  logoClass="size-20"/>
  </div>
</section>
}
  `,
})
export class MainComponent implements OnInit{
  private readonly followersStore = inject(FollowersStore) ;
  readonly postsStore = inject(PostsStore) ;

  isIntro = signal<boolean>(true);
  readonly chatStore = inject(ChatStore)

  constructor(){
  this.chatStore.getChats()
  this.followersStore.initRealTime();
  this.postsStore.getPublicPosts();
  this.postsStore.getFollowingPosts();
  this.postsStore.initRealTimeForPosts();
  }
  

  ngOnInit(): void {
  timer(1500).subscribe(() => this.isIntro.set(false));
  }
  
}
