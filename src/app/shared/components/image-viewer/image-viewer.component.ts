import { Component, inject } from '@angular/core';
import { ImageViewerStore } from '../../../store/imageViewer/imageViewer.signal';

@Component({
  selector: 'app-image-viewer',
  imports: [],
  template : `
  @if (imageViewerStore.isLoad()) {
<section class="w-full h-screen fixed top-0 left-0 z-100 flex justify-center items-center">
<div class="relative w-[90%] sm:w-auto h-[80%] sm:h-[95%]  z-100  rounded-2xl">
<img [src]="imageViewerStore.file_url()" 
alt="image-viewer" class="size-full object-cover animate-opacity-up rounded-2xl">
<i (click)="imageViewerStore.getImage('' , false)"
class="size-5 bg-sawa-primary text-center fa-solid fa-close text-background rounded-full 
absolute left-2 top-2 text-xl btn-hover">
</i>
</div>
<div (click)="imageViewerStore.getImage('' , false)" 
class="w-full h-full fixed top-0 left-0 z-50 bg-background opacity-60 "></div>
</section>
}
`,
  styles: ``
})
export class ImageViewerComponent {
  readonly imageViewerStore = inject(ImageViewerStore)
}
