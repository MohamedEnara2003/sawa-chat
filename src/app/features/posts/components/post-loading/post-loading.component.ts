import { Component } from '@angular/core';

@Component({
  selector: 'app-post-loading',
  imports: [],
  template : `
   <div>
   <div class="w-full flex gap-2 items-center my-1">
    <div class="size-10  bg-tint animate-pulse rounded-full"></div>
    <div class="w-30 h-2 bg-tint animate-pulse rounded-full"></div>
    </div>
    <div class="w-full h-80 bg-tint animate-pulse rounded-box"></div>
   </div>
  `,
})
export class PostLoadingComponent {

}
