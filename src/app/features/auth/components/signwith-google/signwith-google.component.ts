import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-signwith-google',
  imports: [],
  template : `
  <button (click)="authService.signInWithGoogle()" type="button"
  class="w-full btn btn-neutral btn-lg font-[300] bg-black text-white opacity-80 capitalize
  hover:bg-background duration-200">
  <i class="fa-brands fa-google text-overlay"></i>
  sign with google
  </button>
  `,
  styles: ``
})
export class SignwithGoogleComponent {
  readonly authService = inject(AuthenticationService);
}
