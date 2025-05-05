import { Component } from '@angular/core';
import { MainLinksComponent } from "../main-links/main-links.component";
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-responsive-nav-links',
  imports: [SharedModule , MainLinksComponent, ],
  template :`
  <footer class="w-full  bg-tint">
    <app-main-links /> 
  </footer>
  `,
})
export class ResponsiveNavLinksComponent {

}
