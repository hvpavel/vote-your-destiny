import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  title: string = '';

  @Input()
  votes: Record<string, number> = {};

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  readonly chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
  };

  chartData(): ChartData<'bar'> {
    const answers = Object.keys(this.votes);
    const votes = Object.values(this.votes);
    const data: ChartData<'bar'> = {
      labels: answers,
      datasets: [{
        data: votes,
        label: 'Votes',
      }],
    }
    return data;
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      data: this.chartData(),
      options: this.chartOptions,
      type: 'bar',
    });
  }

  ngOnChanges(): void {
    if (!this.chart) {
      return;
    }

    const chartData = this.chartData();
    this.chart.data.labels = chartData.labels;
    this.chart.data.datasets[0].data = chartData.datasets[0].data;
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
