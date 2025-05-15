import { Component } from '@angular/core';
import { SettingLinksComponent } from "../components/setting-links/setting-links.component";

@Component({
  selector: 'app-settings',
  imports: [SettingLinksComponent],
  template : `
  <section aria-label="Settings Page" class="w-full h-[90vh] p-4">
  <app-setting-links />
  </section>
  `
})
export class SettingsComponent {

}
