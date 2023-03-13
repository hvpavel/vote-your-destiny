export interface PollAnswer {
  id: string;
  answer: string;
}

export interface Poll {
  question: string;
  answers: PollAnswer[];
}
