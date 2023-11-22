import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NgModel } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true },
    { provide: NgModel, useExisting: PasswordMatchDirective, multi: true }
  ],
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') otherControl: AbstractControl | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.otherControl) {
      return null;
    }

    const password = control.value;
    const confirmPassword = this.otherControl.value;

    if (password !== confirmPassword) {
      return { passwordMatch: true };
    }

    return null;
  }
}
