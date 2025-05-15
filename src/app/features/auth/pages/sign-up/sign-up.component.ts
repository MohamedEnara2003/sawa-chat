import { Component, linkedSignal, OnInit, signal } from '@angular/core';
import { AuthFeildComponent } from "../../components/auth-feild/auth-feild.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { AuthData } from '../../interface/auth';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { SignwithGoogleComponent } from "../../components/signwith-google/signwith-google.component";


@Component({
  selector: 'app-sign-up',
  imports: [AuthFeildComponent, SharedModule, BtnComponent, InputFieldComponent, SignwithGoogleComponent],
  template : `
  <form [formGroup]="form" aria-label="Sign up" 
  class="w-full flex flex-col justify-center items-center gap-5">
  <app-input-field  
  label="*full name"  
  fieldId="fullName" 
  [formGroup]="form"
  controlName="fullName" 
  class="w-full">
  <p class="text-error capitalize text-sm">
  @let FullName = form.get('fullName');
  @if(FullName?.invalid && FullName?.touched){
  @if(FullName?.getError('required')){Enter a password}
  @else if (FullName?.getError('minlength')) {write a valid password}
  @else if (FullName?.getError('maxlength')) {write a valid password} 
  }
  </p>
  </app-input-field>

  <app-auth-feild  [formGroup]="form" class="w-full"/>
  <div class="w-full flex flex-col justify-center items-center gap-5">
  <app-btn (click)="signUp()" btnType="submit" class="w-full text-center" 
  btnClass="w-[90%] btn btn-lg btn-neutral  font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  sign up
  </app-btn>
  <app-signwith-google  class="w-full text-center"/>
  <a routerLink="/auth/sign-in" class="text-overlay link text-center link-hover">
  Already have an account? Log In
  </a>
  </div>
</form>
  `
})
export class SignUpComponent implements OnInit {
  form : FormGroup ;

  constructor(
  private authService : AuthenticationService ,
  private fb : FormBuilder ,
  private router : Router ,
  ){}

  ngOnInit(): void {
  this.initFormGroup() ;
  }

  private initFormGroup () : void {
  this.form = this.fb.group({
  fullName : [null , {validators : [ Validators.required ,Validators.minLength(6), Validators.maxLength(60)]}] ,
  email : [null , {validators : [ Validators.required, Validators.email]}] ,
  password : [null , {validators : [ Validators.required,Validators.minLength(6), Validators.maxLength(60)]}]
  })
  }

  signUp() : void {
  const value : AuthData = this.form.getRawValue();
  if(this.form.valid){
  this.authService.signUp(value.fullName , value.email , value.password).subscribe({
  next : () => this.router.navigate(['/auth/call-back']) ,
  })

  }
  }
}
