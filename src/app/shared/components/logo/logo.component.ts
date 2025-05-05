import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-logo',
  imports: [SharedModule],
  template : `
  <div  aria-label="logo-link" 
  class="bg-white rounded-full flex justify-center items-center  overflow-hidden btn-hover"
  [ngClass]="logoClass() ? logoClass(): 'size-12 md:size-15'">
  <svg viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-[65%] mr-2">
  <path d="M0 0L17.8404 12.2474H43V44H10.9787V19.5052L0 0Z" fill="black"/>
  </svg>
  </div>
  `
})
export class LogoComponent {
  logoClass = input<string>()
}
