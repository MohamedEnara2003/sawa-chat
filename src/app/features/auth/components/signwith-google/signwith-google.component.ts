import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";

@Component({
  selector: 'app-signwith-google',
  imports: [BtnComponent],
  template : `
  <app-btn  (click)="authService.signInWithGoogle()" btnType="button" 
  btnClass="w-[80%] btn btn-neutral  font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  sign with google
  </app-btn>
  `,
  styles: ``
})
export class SignwithGoogleComponent {
  readonly authService = inject(AuthenticationService);
}
