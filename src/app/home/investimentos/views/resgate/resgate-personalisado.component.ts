import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit {

  public model: any;
  public form: FormGroup;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) {

    this.form = this.fb.group({
      indicadorCarencia: [null, Validators.required],
      nome: [null, Validators.required],
      objetivo: [null, Validators.required],
      acoes: this.fb.array([])
    });

    if (this.router.getCurrentNavigation() != null) {
      const currentState = this.router.getCurrentNavigation()?.extras?.state;
      if (!currentState?.['data']) {
        this.goToLista();
      }
      this.model = currentState?.['data'];
      console.log(this.model)
    }
  }

  ngOnInit(): void {
    this.loadAcoes();
  }

  loadAcoes() {
    this.form.patchValue(this.model)
    this.addAcoes();
  }

  calcSaldoAcumul(percentual: number) {
    return percentual * this.model.saldoTotal / 100;
  }

  goToResgatar(acao: any) {
    console.log(acao)
  }

  goToLista() {
    this.router.navigate(['/list']);
  }

  addAcoes() {
    this.model.acoes.forEach((acao: any) => {
      this.getFormArrayAcoes.push(this.fb.group(Object.assign(acao, { resgatar: 0 })))
    });
  }

  get getFormArrayAcoes(): FormArray {
    return this.form.get('acoes') as FormArray;
  }

  getControls() {
    return (this.form.get('acoes') as FormArray).controls;
  }
}
