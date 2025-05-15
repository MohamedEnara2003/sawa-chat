import { Component, signal } from '@angular/core';
import { AuthFeildComponent } from "../../components/auth-feild/auth-feild.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../interface/auth';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SignwithGoogleComponent } from "../../components/signwith-google/signwith-google.component";


@Component({
  selector: 'app-sign-in',
  imports: [AuthFeildComponent, BtnComponent, SharedModule, SignwithGoogleComponent],
  template : `
  <form [formGroup]="form" aria-label="Sign in" 
  class="w-full flex flex-col justify-center items-center gap-5">
  <app-auth-feild  [formGroup]="form"  class="w-full"/>
  <div class="w-full flex flex-col justify-center items-center gap-5">
  <app-btn  (click)="signIn()" btnType="submit" class="w-full text-center" 
  btnClass="w-[90%] btn btn-lg btn-neutral  font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  sign in
  </app-btn>
  <app-signwith-google  class="w-full text-center"/>
  <a routerLink="/auth/sign-up" class="text-overlay link text-center link-hover">
  Don't have an account? Create One
  </a>
  </div>
  </form>

  `
})
export class SignInComponent {
  form : FormGroup ;
  msgError = signal<string>('');
  constructor(
  private authService : AuthenticationService ,
  private fb : FormBuilder ,
  private router : Router
  ){}

  ngOnInit(): void {
  this.initFormGroup() ;
  }

  private initFormGroup () : void {
  this.form = this.fb.group({
  email : [null , {validators : [ Validators.required, Validators.email]}] ,
  password : [null , {validators : [ Validators.required , Validators.minLength(6), Validators.maxLength(50)]}]
  })
  }

  signIn() : void {
    const value : AuthData = this.form.getRawValue();
    if(this.form.valid){
    this.authService.signIn(value.email , value.password)
    .subscribe({
      next : (({_ , error}) => {
        if(!error){
        this.router.navigateByUrl('home')
        }
      })
    })

    }
  }

}
