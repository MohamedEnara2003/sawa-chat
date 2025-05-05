import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-follow-stats',
  imports: [],
  template : `
  <div class="w-full flex flex-col justify-center items-center">
    <span class="text-white font-semibold"  >{{statCount()}}</span>
    <span class="text-overlay capitalize">{{statLabel()}}</span>
  </div>
  `
})
export class ProfileFollowStatsComponent {
  statCount = input.required<number>();
  statLabel = input.required<string>();
}
