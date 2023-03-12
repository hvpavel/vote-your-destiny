import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Poll } from './poll.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  poll: Poll | null = null;

  updatePoll(poll: Poll | null): void {
    this.poll = poll;
  }
}
