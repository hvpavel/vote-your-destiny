import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PollFormBuilder } from '../poll-form-builder.service';
import { PollForm } from '../editor.models';
import { Poll } from '../../poll.models';

/**
 * hvpavel@
 * import { cloneDeep, isEqual } from 'lodash-es';
 *
 * The two following functions replace the lodash-es import statement.
 * For some unknown reason StackBlitz cannot see @types/lodash-es
 * even though it is specified in package.json and installed
 *
 * These two functions, of course, cannot replace the original functions from lodash.
 * They are, however, sufficient for the needs of EditorComponent
 * and are only used to allow the project run on StackBlitz.
 */
function cloneDeep<T = any>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isEqual(v1: unknown, v2: unknown): boolean {
  return JSON.stringify(v1) === JSON.stringify(v2);
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @Output()
  pollChange = new EventEmitter<Poll | null>();

  @Output()
  reset = new EventEmitter<void>();

  readonly maxAnswers = 10;

  readonly maxLength = 80;

  readonly destroy$ = new Subject<void>();

  pollForm: PollForm;

  constructor(private pollFormBuilderService: PollFormBuilder) {
    this.pollForm = this.pollFormBuilderService.makeEmptyPollForm();
  }

  private preparePoll(): Poll | null {
    if (this.pollForm.invalid) {
      return null;
    }

    const answers = cloneDeep(this.pollForm.value.answers || {}) as Record<string, string>;
    for (let key of Object.keys(answers)) {
      if (!answers[key]) {
        delete answers[key];
      }
    }
    return {
      question: this.pollForm.value.question as string,
      answers,
    };
  }

  private lastPollEmitted: Poll | null = null;

  answers(): FormRecord<FormControl<string>> {
    return this.pollForm.controls.answers;
  }

  answersCount(): number {
    return Object.keys(this.answers().controls).length;
  }

  canAddAnswer(): boolean {
    return this.answersCount() < this.maxAnswers;
  }

  addAnswer(): void {
    if (this.canAddAnswer()) {
      this.pollFormBuilderService.addEmptyAnswerControl(this.pollForm);
    }
  }

  deleteAnswer(answerId: string): void {
    this.pollForm.controls.answers.removeControl(answerId);
  }

  resetPoll(): void {
    this.pollForm.setControl('answers', this.pollFormBuilderService.makeAnswersGroupControl(), { emitEvent: false });
    this.pollForm.reset({}, { emitEvent: false });

    this.reset.emit();
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
