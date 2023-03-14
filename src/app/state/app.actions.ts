import { createAction, createFeatureSelector, props } from '@ngrx/store';
import { Poll } from '../poll.models';

export const pollUpdated = createAction('Poll updated', props<{ poll: Poll | null }>());

export const voteAdded = createAction('Vote added', props<{ answerId: number }>());

export const resetData = createAction('Reset data');
