import { Component, signal } from '@angular/core';
import { AuthFeildComponent } from "../../components/auth-feild/auth-feild.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../interface/auth';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  imports: [AuthFeildComponent],
  template : `
 
  <app-auth-feild class="w-100" [formGroup]="form"  legendElText="sign in">
  <a forgotPassword aria-label="forgot-password-linke" class="capitalize link link-hover">
  Forgot Password
  </a>
  <button (click)="signIn()" type="submit" class="btn btn-neutral btn-lg font-[300] bg-black opacity-80 capitalize w-full">
  sign in
  </button>
  </app-auth-feild>
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
