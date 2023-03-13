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
