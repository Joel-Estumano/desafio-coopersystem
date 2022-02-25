import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsCustom {

  constructor(private readonly alertService: AlertService) { }

  static validatorNumberAboveZero(control: FormControl): { [s: string]: boolean } | null {
    //revisado para refletir nulo como um valor aceitável
    if (control.value === null) { return null; }
    if (isNaN(control.value)) {
      return { 'NaN': true };
    }
    if (control.value == 0) {
      return { 'NaN': true };
    }
    return null;
  }
  /**
   * 
   * @param form Formulário a ser verificado quando da existência de campo ou campos inválido(s) conforme especificação prevista de validação.
   * @returns true ou false
   */
  public isValidForm(form: FormGroup): boolean {
    if (!form.valid) {
      Object.keys(form.controls).forEach(field => {
        const f = form.get(field);
        if (f) {
          f.markAsDirty();
        }
        this.findInvalidControls(form).forEach(item => {
          if (item === field) {
            alert('O campo ' + item + ' deve ser preenchido corretamente!');
          }
        });
      });
    }
    return form.valid;
  }

  public isValidForms(...forms: FormGroup[]): any {
    let invalidsControls: string[] = [];
    forms.forEach(form => {
      if (!form.valid) {
        Object.keys(form.controls).forEach(control => {
          const f = form.get(control);
          if (f) {
            f.markAsDirty();
            invalidsControls.push(control);
          }
        });
      }
    })
    if (invalidsControls.length > 0) {
      this.alertService.showWrong();
      return false;
    } else {
      return true;
    }
  }

  public applyCssError(form: FormGroup, field: string) {
    return { /*não meixa aqui tio! */
      'is-invalid': this.virifyValidTouched(form, field),
      'has-feedback': this.virifyValidTouched(form, field)
    }
  }

  public virifyValidTouched(form: FormGroup | any, field: string) {
    return !form.get(field).valid && (form.get(field).touched || form.get(field).dirty);
  }

  private findInvalidControls(form: FormGroup): any[] {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  /* 
  Retorna uma lista de nomes de controls ou grupo inválidos ou uma lista de comprimento zero se
   nenhum control ou grupo inválido for encontrado.
*/
  private findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control) {
          if (control.invalid) {
            invalidControls.push(field);
          }
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
}
