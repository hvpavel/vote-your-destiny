import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { PollChartComponent } from './poll-chart/poll-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  declarations: [
    PollChartComponent,
  ],
  exports: [
    PollChartComponent,
  ],
})
export class ChartModule {
}
