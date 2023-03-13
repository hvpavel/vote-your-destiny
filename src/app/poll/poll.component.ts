import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  vote = new EventEmitter<number>();

  selectedAnswer: number | null = null;

  voteAnswer(): void {
    if (this.selectedAnswer !== null) {
      this.vote.emit(this.selectedAnswer);
    }
  }
}
