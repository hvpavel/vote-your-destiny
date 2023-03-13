import { FormArray, FormControl, ValidatorFn } from '@angular/forms';

export function minNonEmptyValues(minNonEmptyValues: number): ValidatorFn {
  return (control) => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const formControls = control.controls.filter(control => control instanceof FormControl) as FormControl[];
    const nonEmptyControls = formControls.filter(control => !!control.value);

    if (nonEmptyControls.length >= minNonEmptyValues) {
      return null;
    }

    return {
      minNonEmptyValues: {
        minNonEmptyValues,
        nonEmptyValues: nonEmptyControls.length,
      },
    };
  };
}
