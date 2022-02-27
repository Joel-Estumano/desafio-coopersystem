import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
/* import { AlertService } from './alert.service'; */

@Injectable({
  providedIn: 'root'
})
export class ValidatorsCustom {

  /* constructor(private readonly alertService: AlertService) { } */

  static allowsToRedeem(saldoAcumulado: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      if (isNaN(value) || value > saldoAcumulado) {
        return { 'NaN': true };
      }
      return null;
    }
  }

  public applyValidationCustomClass(index: number, form: any) {
    if (!form.at(index)) {
      throw new Error('There is no formControl in position: ' + index);
    }
    return {
      'is-invalid': this.isFormArrayFieldValid(index, form),
      'has-valid': !this.isFormArrayFieldValid(index, form)
    }
  }

  public isFormArrayFieldValid(index: number, form: FormArray) {
    if (!form.at(index)) {
      throw new Error('There is no formControl in position: ' + index);
    }
    return !form.at(index).valid && (form.at(index).touched || form.at(index).dirty);
  }
}