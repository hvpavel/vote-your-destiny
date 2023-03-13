import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Poll } from '../poll.models';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollChartComponent implements OnChanges {
  @Input()
  poll!: Poll;

  @Input()
  pollResults: Record<number, number> = {};

  chartValues: Record<number, number> = {};

  totalVotes = 0;

  private updateChartValues(): void {
    this.chartValues = {};

    this.totalVotes = this.poll.answers.reduce((acc, _, answerId,) => (this.pollResults[answerId] ?? 0) + acc, 0);

    this.poll.answers.forEach((_, answerId) => {
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
