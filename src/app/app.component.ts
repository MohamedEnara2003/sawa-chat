import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { UserStore } from './store/users/users.signal';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  readonly userStore = inject(UserStore) ;

  ngOnInit(): void {
  this.userStore.LoadUser();
  }
}
