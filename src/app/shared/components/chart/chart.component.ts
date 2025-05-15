import { Component, effect, input, viewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../../modules/shared.module';
import { ChartConfiguration, ChartType } from 'chart.js';
@Component({
  selector: 'app-chart',
  imports: [SharedModule , BaseChartDirective],
  template : `
  <div aria-label="Chart" class="relative w-full max-w-4xl h-[300px]  lg:h-[350px] mx-auto ">
  <ng-content />
  <canvas baseChart
  [data]="data()"
  [options]="options()"
  [type]="type()"
  
  >
  </canvas>
  </div>
  `
})
export class ChartComponent {
  data = input.required<ChartConfiguration['data']>() ;
  options = input.required<ChartConfiguration['options']>() ;
  type  = input.required<ChartType>() ;
 
  chart = viewChild<BaseChartDirective>(BaseChartDirective) ;

  constructor(){
  effect(() => {
  this.refreshChart()
  })
  }
  
  refreshChart() {
    window.addEventListener('resize' , () => {
      this.chart()?.update();
    })

  }
}
