import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsCustom {

  static allowsToRedeem(saldoAcumulado: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      if (isNaN(value) || value > saldoAcumulado.toFixed(2)) {
        return { 'NaN': true };
      }
      return null;
    }
  }

  public applyInvalidCustomClass(form: FormGroup, field: string, classCustom: string) {
    const classe = '{"' + classCustom + '": ' + this.virifyValidTouched(form, field) + '}'
    console.log(classe)
    return JSON.parse(classe)
  }

  public applyInvalidClass(form: FormGroup, field: string) {
    return {
      'is-invalid': this.virifyValidTouched(form, field),
      'has-feedback': this.virifyValidTouched(form, field)
    }
  }

  public virifyValidTouched(form: FormGroup | any, field: string) {
    return !form.get(field).valid && (form.get(field).touched || form.get(field).dirty);
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