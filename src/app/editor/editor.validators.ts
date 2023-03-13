import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export function minNonEmptyValues(minNonEmptyValues: number): ValidatorFn {
  return (control) => {
    let childControls: AbstractControl[] = [];
    let canBeChecked = false;
    if (control instanceof FormArray) {
      childControls = control.controls;
      canBeChecked = true;
    } else if (control instanceof FormGroup) {
      childControls = Object.values(control.controls);
      canBeChecked = true;
    }

    if (!canBeChecked) {
      return null;
    }

    childControls = childControls.filter(control => control instanceof FormControl && !!control.value);

    if (childControls.length >= minNonEmptyValues) {
      return null;
    }

    return {
      minNonEmptyValues: {
        minNonEmptyValues,
        nonEmptyValues: childControls.length,
      },
    };
  };
}
