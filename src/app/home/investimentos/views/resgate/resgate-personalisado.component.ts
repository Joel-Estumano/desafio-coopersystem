import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit, AfterViewInit {

  public data: any;
  public form: FormGroup;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) {

    this.form = this.fb.group({
      indicadorCarencia: [null, Validators.required],
      nome: [null, Validators.required],
      objetivo: [null, Validators.required],
      acoes: this.fb.array([]),
      saldoTotal: [null, Validators.required]
    });

    if (this.router.getCurrentNavigation() != null) {
      const currentState = this.router.getCurrentNavigation()?.extras?.state;
      if (!currentState?.['data']) {
        this.goToLista();
      }
      this.data = currentState?.['data'];
    }
  }

  ngOnInit(): void {
    this.loadAcoes();
  }

  ngAfterViewInit() {
    console.log(this.getFormArrayAcoes)
  }

  loadAcoes() {
    this.form.patchValue(this.data)
    this.addAcoes();
  }

  calcSaldoAcumul(percentual: number) {
    return percentual * this.data.saldoTotal / 100;
  }

  goToResgatar(acao: any) {
    console.log(acao)
  }

  goToLista() {
    this.router.navigate(['/list']);
  }

  addAcoes() {
    this.data.acoes.forEach((acao: any) => {
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
