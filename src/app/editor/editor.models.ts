import { FormControl, FormGroup, FormRecord } from '@angular/forms';

export type PollForm = FormGroup<{
  question: FormControl<string>;
  answers: FormRecord<FormControl<string>>;
}>;
