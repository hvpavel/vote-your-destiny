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

  pollResults: Record<number, number> = {};

  updatePoll(poll: Poll | null): void {
    this.poll = poll;
    this.pollResults = {};
  }

  vote(answerIdx: number): void {
    this.pollResults = {
      ...this.pollResults,
      [answerIdx]: (this.pollResults[answerIdx] ?? 0) + 1,
    };
  }
}
