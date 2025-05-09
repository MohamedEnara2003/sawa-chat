import { Component } from '@angular/core';

@Component({
  selector: 'app-post-loading',
  imports: [],
  template : `
  <li class="w-full  flex flex-col justify-center items-start gap-2 ">
    <div class="w-full flex gap-2 items-center">
    <div class="size-10  bg-tint animate-pulse rounded-full"></div>
    <div class="w-30 h-2 bg-tint animate-pulse rounded-full"></div>
    </div>
    <div class="w-full h-80 bg-tint animate-pulse rounded-box"></div>
</li>
  `,
})
export class PostLoadingComponent {

}
