import { Component, inject} from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { ChartComponent } from "../../../../shared/components/chart/chart.component";

@Component({
  selector: 'app-profile-activity',
  imports: [ ChartComponent],
  template :`
    <section class="w-full flex flex-col gap-10 justify-center items-start"> 
    
    @for (chart of profileService.chartDataArray(); track chart) {
    @defer (on viewport) {
    <app-chart
    [data]="chart.data"
    [options]="chart.option"
    [type]="chart.type"
    class="w-full">
    </app-chart>
    }@placeholder {
    <div class="w-full h-[50vh] flex justify-center items-center">
      <span class="loading loading-spinner size-20 text-sawa-primary"></span>
    </div>
    }
    }



    </section>
  `
})
export class ProfileActivityComponent {
  readonly profileService = inject(ProfileService) ;

}
