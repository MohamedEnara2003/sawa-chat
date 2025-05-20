import { Component, inject } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { ChartComponent } from "../../../../shared/components/chart/chart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-activity',
  standalone: true,
  imports: [ChartComponent, CommonModule],
  template: `
    <section class="w-full flex flex-col gap-10 justify-center items-start"> 

        @for (chart of profileService.chartDataArray(); track chart) {
          <app-chart
            [data]="chart.data"
            [options]="chart.option!"
            [type]="chart.type"
            class="w-full">
          </app-chart>
        }
      
    </section>
  `
})
export class ProfileActivityComponent   {
  readonly profileService = inject(ProfileService);

}
