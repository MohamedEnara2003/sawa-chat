import { Component, input } from '@angular/core';
import { SharedModule } from '../../../../modules/shared.module';


@Component({
  selector: 'app-profile-skills',
  imports: [SharedModule],
  template : `
  <div class="w-full flex flex-col justify-center gap-5">
  <ng-content select="[title]" />
  <ul class="w-full grid grid-cols-2 justify-items-center-safe gap-4">
  @for (skill of skills(); track skill ; let index = $index ) {
  <li class="w-full text-center bg-tint rounded-2xl  py-2 text-white capitalize text-sm"
  [ngClass]="{'col-span-2' : skills.length % 2 !== 0 && index === skills.length - 1}">
  {{skill}}
  </li>
  }
  </ul>
  </div>
  `
})
export class ProfileSkillsComponent {
  skills = input.required<string[]>()
}
