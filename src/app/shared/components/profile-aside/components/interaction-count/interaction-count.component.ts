import { Component, inject } from '@angular/core';
import { PostsStore } from '../../../../../store/posts/posts.signal';
import { FollowersStore } from '../../../../../store/followers/followers.signal';

@Component({
  selector: 'app-interaction-count',
  imports: [],
  template: `
    <nav class="w-full">
        <ul class="w-full flex justify-evenly items-center">
        <li class="flex flex-col justify-center items-center">
        <h2 class="text-white font-extrabold text-lg">{{followersStore.followersCount()}}</h2>
        <p  class="text-overlay capitalize text-sm">followers</p>
        </li>
        <li  class="flex flex-col justify-center items-center">
        <h2 class="text-white font-extrabold text-lg">{{followersStore.followingCount()}}</h2>
        <p  class="text-overlay capitalize text-sm">following</p>
        </li>
        <li  class="flex flex-col justify-center items-center">
        <h2 class="text-white font-extrabold text-lg">{{postStore.likesCount()}}</h2>
        <p  class="text-overlay capitalize text-sm">likes</p>
        </li>
        </ul>
    </nav>
  `,
  styles: ``
})
export class InteractionCountComponent {
readonly followersStore = inject(FollowersStore); 
readonly postStore= inject(PostsStore);  
}
