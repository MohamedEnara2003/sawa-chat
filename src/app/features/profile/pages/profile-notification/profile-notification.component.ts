import { Component } from '@angular/core';
import { NotificationsComponent } from "../../../notifications/ui/notifications.component";

@Component({
  selector: 'app-profile-notification',
  imports: [NotificationsComponent],
  template : `
    <div class="w-full " >
    <app-notifications class="w-full h-full"/>
    </div>
  `,
})
export class ProfileNotificationComponent {

}
