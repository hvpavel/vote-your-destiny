import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Poll } from '../poll.models';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent {
  @Input()
  poll!: Poll;

  vote(): void {
  }
}
