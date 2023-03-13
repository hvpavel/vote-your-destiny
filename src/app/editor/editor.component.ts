import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { cloneDeep, isEqual } from 'lodash-es';
import { Subject, takeUntil } from 'rxjs';

import { Poll } from '../poll.models';
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

  get answers(): FormArray<FormControl<string | null>> {
    return this.pollForm.controls.answers;
  }

  get answerControls(): FormControl<string | null>[] {
    return this.pollForm.controls.answers.controls;
  }

  get canAddAnswer(): boolean {
    return this.answers.length < this.maxAnswers;
  }

  pollForm: PollForm = this.makeEmptyPollForm();

  private makeQuestionControl(): FormControl<string | null> {
    const textControl = this.makeTextControl();
    textControl.addValidators(Validators.required);
    return textControl;
  }

  private makeTextControl(): FormControl<string | null> {
    return new FormControl('', Validators.maxLength(this.maxLength));
  }

  private makeEmptyPollForm(): FormGroup {
     const pollForm = new FormGroup({
      question: this.makeQuestionControl(),
      answers: new FormArray<FormControl<string | null>>([
        this.makeTextControl(),
        this.makeTextControl(),
      ], minNonEmptyValues(2)),
    });
    pollForm.setValue({
      question: 'What is the capital of the UK?',
      answers: [
        'London',
        'Liverpool',
      ],
    });
    return pollForm;
  }

  private preparePoll(): Poll | null {
    if (this.pollForm.invalid) {
      return null;
    }

    const poll: Poll = cloneDeep(this.pollForm.value as Poll);
    poll.answers = poll.answers.filter(answer => !!answer);
    return poll;
  }

  private lastPollEmitted: Poll | null = null;

  addAnswer(): void {
    if (this.answers.length < this.maxAnswers) {
      this.answers.push(this.makeTextControl());
    }
  }

  deleteAnswer(optionIndex: number): void {
    this.answers.removeAt(optionIndex);
  }

  reset(): void {
    this.pollForm = this.makeEmptyPollForm();
  }

  hasRepetition(answerIdx: number): boolean {
    const currentAnswer = this.answerControls[answerIdx].value;

    if (currentAnswer === null || currentAnswer === '') {
      return false;
    }

    for (let i = 0; i < answerIdx; i++) {
      if (this.answerControls[i].value === currentAnswer) {
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
