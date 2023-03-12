import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type PollForm = FormGroup<{
  question: FormControl<string | null>;
  answers: FormArray<FormControl<string | null>>;
}>
