import { Component, OnInit, signal } from '@angular/core';
import { MainLinksComponent } from "../main-links/main-links.component";
import { SharedModule } from '../../modules/shared.module';
import { fromEvent, map, pairwise, tap } from 'rxjs';

@Component({
  selector: 'app-responsive-nav-links',
  imports: [SharedModule , MainLinksComponent, ],
  template :`
  @if(isScroll()){ 
<nav aria-label="Responsive links" 
class="fixed  bottom-0 left-0  md:hidden w-full py-1 border-t border-t-overlay bg-tint  z-50 
shadow shadow-background animate-up   ">
    <app-main-links /> 
</nav>
  }
  `,
})
export class ResponsiveNavLinksComponent implements OnInit{
  isScroll = signal<boolean>(true);

  ngOnInit(): void {
    this.initNavLoading()
  }

  private initNavLoading() : void {
    fromEvent(window , 'scroll').pipe(
    map(() => window.scrollY),
    pairwise(),
    tap(([a , b]) => this.isScroll.set(a > b || a < 50 && b < 50 ? true : false))
    ).subscribe();
  }

}
