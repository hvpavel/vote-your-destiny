import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';

import { PollForm } from './editor/editor.models';
import { minNonEmptyValues } from './validators';

@Injectable({ providedIn: 'root' })
export class PollFormBuilder {
  private lastAnswerId = 0;

  nextAnswerId(): string {
    return (++this.lastAnswerId).toString();
  }

  makeQuestionControl(): FormControl<string> {
    const textControl = this.makeTextControl();
    textControl.addValidators(Validators.required);
    return textControl;
  }

  makeTextControl(): FormControl<string> {
    return new FormControl('', { nonNullable: true });
  }

  makeAnswersGroupControl(): FormRecord<FormControl<string>> {
    return new FormRecord({
      [this.nextAnswerId()]: this.makeTextControl(),
      [this.nextAnswerId()]: this.makeTextControl(),
    }, { validators: minNonEmptyValues(2) });
  }

  makeEmptyPollForm(): PollForm {
     const pollForm: PollForm = new FormGroup({
      question: this.makeQuestionControl(),
      answers: this.makeAnswersGroupControl(),
    });

    return pollForm;
  }

  addEmptyAnswerControl(pollForm: PollForm): void {
    pollForm.controls.answers.addControl(this.nextAnswerId(), this.makeTextControl());
  }
}
