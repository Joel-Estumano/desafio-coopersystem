import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsCustom } from 'src/app/core/services/validators-custom.service';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit, AfterViewInit {

  public data: any;
  public form: FormGroup;

  constructor(private readonly router: Router,
    private readonly fb: FormBuilder,
    public readonly validatorsCustom: ValidatorsCustom) {

    this.form = this.fb.group({
      indicadorCarencia: [null, Validators.required],
      nome: [null, Validators.required],
      objetivo: [null, Validators.required],
      acoes: this.fb.array([], [Validators.required]),
      saldoTotal: [null, Validators.required],
      totalDoResgate: [null]
    });

    if (this.router.getCurrentNavigation() != null) {
      const currentState = this.router.getCurrentNavigation()?.extras?.state
      if (!currentState?.['data']) {
        this.goToLista()
      }
      this.data = currentState?.['data']
    }
  }

  ngOnInit(): void {
    this.loadForm()
  }

  ngAfterViewInit() {
    console.log(this.getFormArrayAcoes)
  }

  loadForm() {
    this.form.patchValue(this.data)
    this.addFormAcoes()
  }

  calcSaldoAcumul(percentual: number) {
    return percentual * this.data.saldoTotal / 100
  }

  goToResgatar(acao?: any) {
    /* console.log(acao) */
  }

  goToLista() {
    this.router.navigate(['/'])
  }

  addFormAcoes() {
    this.data.acoes.forEach((acao: any) => {
      const acaoControl = new FormGroup({
        id: new FormControl(acao.id, [Validators.required]),
        nome: new FormControl(acao.nome, [Validators.required]),
        percentual: new FormControl(acao.percentual, [Validators.required]),
        resgatar: new FormControl(null, [ValidatorsCustom.allowsToRedeem(this.calcSaldoAcumul(acao.percentual)).bind(this)])
      })
      this.getFormArrayAcoes.push(acaoControl)
    });
  }

  get getFormArrayAcoes(): FormArray {
    return this.form.get('acoes') as FormArray
  }

  getControls() {
    return (this.form.get('acoes') as FormArray).controls
  }

  updatetotalDoResgate() {
    const total = this.getControls().reduce(
      (soma, atual) => soma + atual.value.resgatar, 0
    );
    console.log(total)
    this.form.patchValue({ 'totalDoResgate': total.toFixed(2) })
  }
}