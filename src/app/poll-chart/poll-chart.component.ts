import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Poll } from '../poll.models';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollChartComponent implements OnChanges {
  @Input()
  poll!: Poll;

  @Input()
  pollResults: Record<string, number> = {};

  chartValues: Record<string, number> = {};

  totalVotes = 0;

  private updateChartValues(): void {
    this.chartValues = {};

    this.totalVotes = Object
      .keys(this.poll.answers)
      .reduce((acc, answerId) => (this.pollResults[answerId] ?? 0) + acc, 0);

    Object.keys(this.poll.answers).forEach(answerId => {
      if (this.totalVotes === 0) {
        this.chartValues[answerId] = 0;
      } else {
        this.chartValues[answerId] = (this.pollResults[answerId] ?? 0) / this.totalVotes * 100;
      }
    });
  }

  ngOnChanges(): void {
    this.updateChartValues();
  }
}
