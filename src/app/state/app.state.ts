import { Poll } from '../poll.models';

export interface AppState {
  poll: Poll | null;
  votes: Record<string, number>;
}
