import {AbstractControl, ValidatorFn} from '@angular/forms';


export function minArrayLengthValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    return value && value.length < min ? {'minArrayLength': {min}} : null;
  };
}
