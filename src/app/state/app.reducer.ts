import { createReducer, on } from '@ngrx/store';
import { pollUpdated, resetData, voteAdded } from './app.actions';
import { AppState } from './app.state';

const initialState: AppState = {
  poll: null,
  votes: {},
};

export const pollReducer = createReducer(
  { ...initialState },
  on(pollUpdated, (state, { poll }) => ({ ...state, poll })),
  on(voteAdded, (state, { answerId }) => ({
    ...state,
    votes: {
      ...state.votes,
      [answerId]: (state.votes[answerId] ?? 0) + 1,
    },
  })),
  on(resetData, () => ({ ...initialState })),
);
