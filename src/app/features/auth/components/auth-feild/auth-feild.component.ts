import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SignwithGoogleComponent } from "../signwith-google/signwith-google.component";

@Component({
  selector: 'app-auth-feild',
  imports: [SharedModule, SignwithGoogleComponent],
  template : `
  <form [formGroup]="formGroup()" aria-label="authentication" 
  class="size-full flex flex-col justify-center items-center capitalize   ">

  <fieldset class="size-[90%] flex flex-col justify-center items-center   gap-4 ">

  <legend class="fieldset-legend text-white text-center text-xl italic">
    {{legendElText()}}
  </legend>

  <ng-content select="[signUp]"/>

  <div class="w-full flex flex-col justify-start gap-2 text-white">
  <label for="email" class="fieldset-label text-white">*email</label>
  <input type="email" class="w-full outline-white input focus:outline-sawa-primary outline-2 
  bg-overlay dark:bg-tint focus:border-transparent" 
  id="email" formControlName="email"
  />
  
  @let Email = formGroup().get('email');
  @if(Email?.invalid && Email?.touched){
  <p class="validator-hint  text-error">
  @if(Email?.getError('email')){write a valid email}
  @else if(Email?.getError('required')){Enter a email address}
  </p>
  }
  </div>

  <div class="w-full flex flex-col justify-start gap-2  text-white">
  <label for="password" class="fieldset-label text-white">*password</label>
  <input [type]="!isShowPassword() ? 'password' : 'text'" 
  class="w-full outline-white input focus:outline-sawa-primary outline-2 bg-overlay dark:bg-tint
  focus:border-transparent" 
  id="password"  formControlName="password"
  />
  @let Password = formGroup().get('password');
  @if(Password?.invalid && Password?.touched){
  <p class="validator-hint  text-error">
  @if(Password?.getError('required')){Enter a password}
  @else if (Password?.getError('minlength')) {write a valid password}
  @else if (Password?.getError('maxlength')) {write a valid password} 
  </p>
  }
  <div class="w-full flex justify-between items-center my-2">
  <div  class="flex justify-center items-center gap-2">
  <input (change)="isShowPassword.set(!isShowPassword())" type="checkbox" name="showPassword" id="showPassword" 
  class="checkbox checkbox-neutral border-1 border-white checkbox-sm">
  <label for="showPassword" class="link link-hover">
  Remember me
  </label>
  </div>
  <ng-content select="[forgotPassword]"/>
  </div>  
  </div>
  <app-signwith-google class="w-full text-center"/>
  <ng-content />
  </fieldset>
</form>
  `
})
export class AuthFeildComponent {
  formGroup = input.required<FormGroup>() ;
  legendElText = input.required<string>();
  isShowPassword = signal<boolean>(false);
}
