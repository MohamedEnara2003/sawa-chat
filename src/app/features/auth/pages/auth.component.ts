import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from "../../../shared/components/logo/logo.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, LogoComponent],
  template : `
  <div aria-label="authentication page" class="w-full flex flex-wrap justify-evenly items-center h-screen ">

  <section class="relative w-[95%] h-full md:w-[50%] lg:w-[45%]  bg-tint">   
  <header class="absolute left-2 top-2">
  <app-logo /> 
  </header>
  <router-outlet />
  </section>

  <picture class="hidden md:inline-block md:w-[40%] lg:w-[50%] h-full ">
  <img src="Rectangle.png" alt="auth image" class="size-full 
  object-cover shadow shadow-background">
  </picture>
  </div>
  `
})
export class AuthComponent {

}
