import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ValidateInList(list: string): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    if(list.includes(control.value)){
      return { inList: true };
    }
    return null;
  }
}
