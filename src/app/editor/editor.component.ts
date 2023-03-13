import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Poll } from '../poll.models';
import { PollForm } from './editor.models';

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

  private makeTextControl(): FormControl<string | null> {
    return new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]);
  }

  private makeEmptyPollForm(): FormGroup {
     const pollForm = new FormGroup({
      question: this.makeTextControl(),
      answers: new FormArray<FormControl<string | null>>([
        this.makeTextControl(),
        this.makeTextControl(),
      ]),
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

    const answers: string[] = (this.pollForm.value.answers || []).filter(answer => !!answer) as string[];

    if (answers.length < 2) {
      return null;
    }
    const poll: Poll = {
      question: this.pollForm.value.question as string,
      answers,
    };
    return poll;
  }

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

  ngOnInit(): void {
    this.pollForm
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.pollChange.emit(this.preparePoll()))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
}
