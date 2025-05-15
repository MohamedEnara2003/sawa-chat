import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-error-load-user',
  imports: [SharedModule],
  template: `
 <div aria-label="failed-load-user"  role="alert"
  class="w-full h-screen bg-background flex flex-col justify-center items-center gap-1">
  <h1 class="title-h1 text-[8rem] text-sawa-primary">404</h1>
  <p class="text-lg text-error capitalize">Failed load user data</p>
  <a routerLink="/auth/sign-in" class="link text-white btn-hover capitalize">please sign in</a>
  </div>
  `,
  styles: ``
})
export class ErrorLoadUserComponent {

}
