import { Component, input } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [SharedModule],
  template: `
<div [formGroup]="formGroup()" class="w-full flex flex-col justify-start gap-2  text-white" >
  <label [for]="fieldId()" class="font-semibold text-white capitalize">
    {{ label() }}
  </label>
  <input
    [type]="type()"
    [id]="fieldId()"
    [name]="fieldId()"
    [formControlName]="controlName()"
    autocomplete="off"
    class="w-full outline-white input focus:outline-sawa-primary outline-2 bg-overlay dark:bg-tint
    focus:border-transparent" />
    <div class="w-full  flex justify-between items-center ">
    <ng-content />
    </div>
</div>
  `,
  styles: ``
})
export class InputFieldComponent {
  label = input<string>('');
  fieldId = input<string>('');
  type = input<'email' | 'password' | 'text'>('text');
  formGroup = input.required<FormGroup>() ;
  controlName = input<string>('');
}
