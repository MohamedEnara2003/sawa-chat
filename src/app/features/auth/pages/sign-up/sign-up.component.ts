import { Component, OnInit, signal } from '@angular/core';
import { AuthFeildComponent } from "../../components/auth-feild/auth-feild.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { AuthData } from '../../interface/auth';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";


@Component({
  selector: 'app-sign-up',
  imports: [AuthFeildComponent, SharedModule, BtnComponent],
  template : `
  
  <app-auth-feild  [formGroup]="form" legendElText="sign up" class="size-full">
    <div signUp class="w-full flex flex-col justify-start gap-2 text-white">
    <label for="fullName" class="fieldset-label  text-white">*full name</label>
    <input type="text" class="w-full input focus:outline-sawa-primary outline-white  outline-2 
    bg-overlay dark:bg-tint focus:border-transparent" 
    id="fullName" formControlName="fullName"/>
    @let FullName = form.get('fullName');
  @if(FullName?.invalid && FullName?.touched){
  <p class="validator-hint  text-error">
  @if(FullName?.getError('required')){Enter a Full Name}
  @else if (FullName?.getError('minlength')) {write a valid password}
  @else if (FullName?.getError('maxlength')) {write a valid password} 
  </p>
  }
    </div>

  <div class="w-full flex flex-col justify-center items-center gap-1">
  <app-btn (click)="signUp()" btnType="submit" class="w-full text-center" 
  btnClass="w-[80%] btn btn-neutral  font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  sign up
  </app-btn>
  <a routerLink="/auth/sign-in" class="text-overlay link text-center">
  Already have an account? Log In
  </a>
  </div>
</app-auth-feild>

  `
})
export class SignUpComponent implements OnInit {
  form : FormGroup ;
  msgError = signal<string>('');

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
  next : () => this.router.navigate([{ outlets: { primary: 'home', 'profile-setup': 'user' } }]) ,
  })

  }
  }
}
