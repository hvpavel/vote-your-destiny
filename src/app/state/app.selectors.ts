import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const selectState = createFeatureSelector<AppState>('poll');

export const selectPoll = createSelector(
  selectState,
  state => state.poll,
);

export const selectVotes = createSelector(
  selectState,
  state => state.votes,
);

export const selectPollQuestion = createSelector(
  selectPoll,
  state => state?.question ?? null,
);

export const selectVotesData = createSelector(
  selectPoll,
  selectVotes,
  (poll, votes) => {
    if (!poll || !votes) {
      return null;
    }

    const votesData: Record<string, number> = {};
    Object.entries(votes).forEach(([answerId, votesCount]) => {
      if (poll.answers[answerId]) {
        const answer = poll.answers[answerId];
        votesData[answer] = votesCount;
      }
    });

    return {
      title: poll.question,
      votes: votesData,
    };
  }
);
