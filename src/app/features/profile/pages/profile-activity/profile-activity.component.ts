import { Component, inject} from '@angular/core';
import { ProfileSettingsComponent } from "../../components/profile-settings/profile-settings.component";
import { ProfileService } from '../../service/profile.service';
import { ChartComponent } from "../../../../shared/components/chart/chart.component";

@Component({
  selector: 'app-profile-activity',
  imports: [ProfileSettingsComponent, ChartComponent],
  template :`
    <section class="w-full flex flex-col gap-10 justify-center items-start"> 
    <app-chart
    [data]="profileService.profileViewsChartData()"
    [options]="profileService.profileViewsChartOptions()"
    type="line"
    class="w-full">
    <div class="text-white capitalize  absolute  top-10 left-12 text-lg">
    <h1>profile views</h1>
    <h5>1,132,818</h5>
    </div>
    </app-chart>

    <app-chart 
    [data]="profileService.postChartData()"
    [options]="profileService.postChartOptions()"
    type="bar"
    class="w-full" 
    />
    <app-chart 
    [data]="profileService.followersGrowthChartData()"
    [options]="profileService.followersGrowthChartOptions()"
    type="bar"
    class="w-full" 
    />
    <app-profile-settings />
    </section>
  `
})
export class ProfileActivityComponent {
  readonly profileService = inject(ProfileService) ;

}
