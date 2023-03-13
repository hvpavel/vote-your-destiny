import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent {
  @Input()
  count: number = 0;

  @Input()
  totalCount: number = 0;

  get value(): number {
    if (this.totalCount === 0) {
      return 0;
    }

    return this.count / this.totalCount * 100;
  }

  get percentValue(): string {
    if (this.totalCount === 0) {
      return 'N/A';
    }

    return parseFloat((this.value).toFixed(2)) + '%';
  }
}
