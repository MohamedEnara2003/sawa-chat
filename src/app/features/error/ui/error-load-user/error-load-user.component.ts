import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-error-load-user',
  imports: [SharedModule],
  template: `
  <section  aria-label="failed-load-user"  role="alert" class="w-full h-screen bg-white dark:bg-background flex justify-center items-center">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-sawa-primary">500</h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-background md:text-4xl dark:text-white">
          Internal Server Error.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-overlay">
          We’re sorry for the inconvenience. Please try again later.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-overlay">
            💡 Tip: Make sure your internet connection is stable. If the issue persists, please contact support
          </p>
        </div>   
    </div>
</section>
  `,
  styles: ``
})
export class ErrorLoadUserComponent {

}
