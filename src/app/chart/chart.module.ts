import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PollChartComponent } from './poll-chart/poll-chart.component';

@NgModule({
  imports: [
    CommonModule,
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
