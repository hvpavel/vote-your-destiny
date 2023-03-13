import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { PollChartComponent } from './poll-chart/poll-chart.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  declarations: [
    PollChartComponent,
    ChartBarComponent,
  ],
  exports: [
    PollChartComponent,
    ChartBarComponent,
  ],
})
export class ChartModule {
}
