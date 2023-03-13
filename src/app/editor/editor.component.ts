import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { Subject, takeUntil } from 'rxjs';

import { Poll, PollAnswer } from '../poll.models';
import { PollForm } from './editor.models';
import { minNonEmptyValues } from './editor.validators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @Output()
  pollChange = new EventEmitter<Poll | null>();

  readonly maxAnswers = 10;

  readonly maxLength = 80;

  readonly destroy$ = new Subject<void>();

  private lastAnswerId = 0;

  pollForm: PollForm = this.makeEmptyPollForm();

  private makeQuestionControl(): FormControl<string> {
    const textControl = this.makeTextControl();
    textControl.addValidators(Validators.required);
    return textControl;
  }

  private makeTextControl(): FormControl<string> {
    return new FormControl('', { nonNullable: true, validators: Validators.maxLength(this.maxLength) });
  }

  private makeEmptyPollForm(): PollForm {
     const pollForm: PollForm = new FormGroup({
      question: this.makeQuestionControl(),
      answers: new FormGroup({
        [this.nextAnswerId()]: this.makeTextControl(),
        [this.nextAnswerId()]: this.makeTextControl(),
      }, { validators: minNonEmptyValues(2) }),
    });

    return pollForm;
  }

  private preparePoll(): Poll | null {
    if (this.pollForm.invalid) {
      return null;
    }

    const answers: PollAnswer[] = [];

    for (let [answerId, answer] of Object.entries(this.pollForm.value.answers || {})) {
      if (answer) {
        answers.push({ id: answerId, answer });
      }
    }
    return {
      question: this.pollForm.value.question as string,
      answers,
    };
  }

  private lastPollEmitted: Poll | null = null;

  private nextAnswerId(): string {
    const nextId = ++this.lastAnswerId;
    return nextId.toString();
  }

  answers(): FormRecord<FormControl<string>> {
    return this.pollForm.controls.answers;
  }

  answersCount(): number {
    return Object.keys(this.answers).length;
  }

  canAddAnswer(): boolean {
    return this.answersCount() < this.maxAnswers;
  }

  addAnswer(): void {
    if (this.canAddAnswer()) {
      this.pollForm.controls.answers.addControl(this.nextAnswerId(), this.makeTextControl());
    }
  }

  deleteAnswer(answerId: string): void {
    this.pollForm.controls.answers.removeControl(answerId);
  }

  reset(): void {
    this.pollForm = this.makeEmptyPollForm();
  }

  hasRepetition(answerIdx: number): boolean {
    const answerControls = Object.values(this.answers().controls);
    const currentAnswer = answerControls[answerIdx].value;

    if (!currentAnswer) {
      return false;
    }

    for (let i = 0; i < answerIdx; i++) {
      if (answerControls[i].value === currentAnswer) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.pollForm
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const poll = this.preparePoll();

        if (isEqual(this.lastPollEmitted, poll)) {
          return;
        }

        this.lastPollEmitted = poll;
        this.pollChange.emit(poll);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
