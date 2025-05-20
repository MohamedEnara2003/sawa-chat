import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-profile-display',
  imports: [SharedModule],
  template : `
  <section class="w-full flex flex-col justify-start items-start gap-5">
  <div class="w-full flex flex-col justify-start items-start gap-4 m-1">
  <h2 class="title-h1 flex justify-center items-center gap-1">
  languages
  </h2>
  @for (item of languagesArr(); track item) {
  <div class="flex justify-center items-center gap-2 capitalize cursor-pointer">
  <input type="checkbox" 
  name="checkbox" [id]="item" class="checkbox checkbox-neutral border-white  ">
  <label [for]="item.lang" >
  {{item.lang}}
  </label>
  </div>
  }
  </div>
  </section>

  `
})
export class ProfileDisplayComponent {

  languagesArr = signal<Array<{lang : 'arabic' | 'english'}>>([
  {lang :'english'},
  {lang :'arabic'} 
  ]
  );
  
}
