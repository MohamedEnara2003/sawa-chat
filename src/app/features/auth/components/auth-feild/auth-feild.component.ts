import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { InputFieldComponent } from "../input-field/input-field.component";

@Component({
  selector: 'app-auth-feild',
  imports: [SharedModule, InputFieldComponent],
  template : `
  <div [formGroup]="formGroup()"
  class="w-full flex flex-col justify-center items-center gap-2">
  <app-input-field
  label="*email"  
  fieldId="email" 
  [formGroup]="formGroup()!"
  type="email"
  controlName="email" 
  class="w-full">
  <p  class="text-error capitalize text-sm">
  @let Email = formGroup().get('email');
  @if(Email?.invalid && Email?.touched){
  @if(Email?.getError('email')){write a valid email}
  @else if(Email?.getError('required')){Enter a email address}
  }
  </p>
</app-input-field>
<app-input-field
  label="*password"  
  fieldId="password" 
  [formGroup]="formGroup()!"
  controlName="password" 
  [type]="!isShowPassword() ? 'password' : 'text'" 
  class="w-full">

 <p class="text-error capitalize text-sm">
  @let Password = formGroup().get('password');
  @if(Password?.invalid && Password?.touched){
  @if(Password?.getError('required')){Enter a password}
  @else if (Password?.getError('minlength')) {write a valid password}
  @else if (Password?.getError('maxlength')) {write a valid password} 
  }
  </p>

  <div  class="flex justify-center items-center  gap-2">
  <input (change)="isShowPassword.set(!isShowPassword())" type="checkbox" name="showPassword" id="showPassword" 
  class="checkbox checkbox-neutral border-1 border-white checkbox-sm">
  <label for="showPassword" class="link link-hover capitalize">
  show password
  </label>
  </div> 
  </app-input-field>


</div>
  `
})
export class AuthFeildComponent {
  formGroup = input.required<FormGroup>() ;
  isShowPassword = signal<boolean>(false);
}
