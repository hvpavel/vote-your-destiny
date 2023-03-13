import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

import { Poll } from '../../poll.models';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollChartComponent {
  @Input()
  poll!: Poll;

  @Input()
  votes: Record<string, number> = {};

  readonly chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
  };

  chartData(): ChartData<'bar'> {
    const data: ChartData<'bar'> = {
      labels: Object.values(this.poll.answers),
      datasets: [{
        data: Object.keys(this.poll.answers).map(answerId => this.votes[answerId] ?? 0),
        label: 'Votes',
      }],
    }
    return data;
  }
}
