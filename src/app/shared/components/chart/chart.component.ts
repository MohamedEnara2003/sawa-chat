import { Component, effect, input, viewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../../modules/shared.module';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [SharedModule, BaseChartDirective],
  template: `
    <div class="relative w-full max-w-4xl h-[300px] lg:h-[350px] mx-auto">
      <canvas baseChart
        [data]="data()"
        [options]="options()"
        [type]="type()"
        (chartInit)="onChartInit($event)">
      </canvas>
    </div>
  `
})
export class ChartComponent implements AfterViewInit {
  data = input.required<ChartConfiguration['data']>();
  options = input.required<ChartConfiguration['options']>();
  type = input.required<ChartType>();
  chart = viewChild<BaseChartDirective>(BaseChartDirective);

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.refreshChart();
    });
  }

  ngAfterViewInit() {
    // Initial chart update after view init
    this.chart()?.update();
  }

  onChartInit(chart: any) {
    // Optimize chart rendering
    chart.options.animation = {
      duration: 0 // Disable animations for faster rendering
    };
    chart.options.responsive = true;
    chart.options.maintainAspectRatio = false;
  }

  refreshChart() {
    // Debounce resize events
    let resizeTimeout: any;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.chart()?.update();
        this.cdr.detectChanges();
      }, 100);
    });
  }
}
