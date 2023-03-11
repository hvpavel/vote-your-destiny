import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  readonly maxOptionsLength = 10;

  get options(): FormArray {
    return this.pollQuestion.get('options') as FormArray;
  }

  get canAddMoreOptions(): boolean {
    return this.options.length < this.maxOptionsLength;
  }

  get canDeleteOption(): boolean {
    return this.options.length > 1;
  }

  pollQuestion = new FormGroup({
    question: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    options: new FormArray([
      new FormControl(''),
      new FormControl(''),
    ]),
  });

  addOption(): void {
    if (this.options.length < this.maxOptionsLength) {
      this.options.push(new FormControl(''));
    }
  }

  deleteOption(optionIndex: number): void {
    this.options.removeAt(optionIndex);
  }

  reset(): void {
    this.pollQuestion.reset();
  }
}
