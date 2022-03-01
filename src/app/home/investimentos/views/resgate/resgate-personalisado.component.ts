import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ValidatorsCustom } from 'src/app/core/services/validators-custom.service';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit {

  public data: any = null;
  public form: FormGroup;

  constructor(private readonly router: Router,
    private readonly fb: FormBuilder,
    public readonly validatorsCustom: ValidatorsCustom,
    private readonly alertService: AlertService) {

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

  loadForm() {
    this.form.patchValue(this.data)
    this.addFormAcoes()
  }

  calcSaldoAcumul(percentual: number) {
    return percentual * this.data.saldoTotal / 100
  }

  goToResgatar(acao?: any) {
    this.alertService.success('confirmar resgate', true);
  }

  goToLista() {
    this.router.navigate(['/'])
  }

  addFormAcoes() {
    if (this.data) {
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
  }

  get getFormArrayAcoes(): FormArray {
    return this.form.get('acoes') as FormArray
  }

  getControls() {
    return (this.form.get('acoes') as FormArray).controls
  }

  updateTotalDoResgate() {
    const total = this.getControls().reduce(
      (soma, item) => soma + item.value.resgatar, 0
    );
    console.log(total)
    this.form.patchValue({ 'totalDoResgate': total.toFixed(2) })
  }
}