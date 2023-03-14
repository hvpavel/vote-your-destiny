import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, Observable } from 'rxjs';

import { Poll } from './poll.models';
import { selectPoll, pollUpdated, voteAdded, selectVotes, resetData } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  poll$ = this.store.select(selectPoll);

  votes$: Observable<Record<string, number>> = this.store.select(selectVotes);

  pollData$ = combineLatest({ poll: this.poll$, votes: this.votes$ }).pipe(
    filter(data => !!data.poll),
  ) as Observable<{ poll: Poll, votes: Record<string, number> }>;

  activeColumn = 0;

  constructor(private store: Store) {
  }

  updatePoll(poll: Poll | null): void {
    this.store.dispatch(pollUpdated({ poll }));
  }

  vote(answerId: number): void {
    this.store.dispatch(voteAdded({ answerId: answerId }))
  }

  setActiveColumn(column: number): void {
    this.activeColumn = column;
  }

  resetData(): void {
    this.store.dispatch(resetData());
  }
}
