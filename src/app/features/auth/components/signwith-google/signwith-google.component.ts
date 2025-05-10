import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";

@Component({
  selector: 'app-signwith-google',
  imports: [BtnComponent],
  template : `
  <app-btn  (click)="authService.signInWithGoogle()" btnType="button" 
  btnClass="w-[90%] btn btn-lg btn-neutral  font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  <i class="fa-brands fa-google text-xl "></i>
  sign with google
  </app-btn>
  `,
  styles: ``
})
export class SignwithGoogleComponent {
  readonly authService = inject(AuthenticationService);
}
