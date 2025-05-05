import { Component, inject, signal } from '@angular/core';
import { DarkModeService } from '../../../../core/services/dark-mode.service';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-profile-display',
  imports: [SharedModule],
  templateUrl: './profile-display.component.html',
})
export class ProfileDisplayComponent {
  darkModeService = inject(DarkModeService);
  modesArr = signal<Array<{mode : 'dark' | 'light'}>>([
    {mode :'dark'},
    {mode :'light'} 
  ]
  );
  languagesArr = signal<Array<{lang : 'arabic' | 'english'}>>([
  {lang :'english'},
  {lang :'arabic'} 
  ]
  );
  
}
