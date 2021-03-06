import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ValidatorsCustom } from 'src/app/core/services/validators-custom.service';
import { Investimento } from '../../interfaces/invetimento.interface';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit {

  public investimento: Investimento = new Investimento();
  public form: FormGroup;

  constructor(private readonly router: Router,
    private readonly fb: FormBuilder,
    public readonly validatorsCustom: ValidatorsCustom,
    private readonly alertService: AlertService) {

    if (this.router.getCurrentNavigation() != null) {
      const currentState = this.router.getCurrentNavigation()?.extras?.state
      if (!currentState?.['data']) {
        this.goToLista()
      }
      this.investimento.fromObject(currentState?.['data']);
    }
    this.form = this.fb.group(this.investimento.createForm());
  }

  ngOnInit(): void {
    this.loadFormAcoes()
  }

  calcSaldoAcumul(percentual: number) {
    return percentual * this.investimento.saldoTotal / 100
  }

  onSubmit() {
    if (this.nonEmptyForm()) {
      if (this.form.valid) {
        this.alertService.success('Resgate efetuado com sucesso!', null, true);
        this.resetFomr()
      } else {
        this.alertService.error('Dados inválidos!', 'Você preencheu um ou mais campos com valor acima do permitido:', this.gerControlsErros(), true);
      }
    }
  }

  goToLista() {
    this.router.navigate(['/invetimentos/list'])
  }

  private loadFormAcoes() {
    if (this.investimento) {
      this.investimento.acoes.forEach((acao: any) => {
        const acaoControl = new FormGroup({
          id: new FormControl(acao.id),
          nome: new FormControl(acao.nome),
          percentual: new FormControl(acao.percentual),
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
    this.form.patchValue({ 'totalDoResgate': total.toFixed(2) })
  }

  gerControlsErros(): any[] {
    let erros: any[] = []
    let controls: any = this.getControls()
    controls.forEach((element: any) => {
      if (element.status === 'INVALID') {
        let erro = {
          nome: element.value.nome,
          limite: this.calcSaldoAcumul(element.value.percentual)
        }
        erros.push(erro)
      }
    });
    return erros
  }

  private nonEmptyForm() {
    let controls: any = this.getControls()
    return controls.find((element: any) => element.value.resgatar !== null);
  }

  private resetFomr() {
    this.getControls().forEach((element: any) => {
      element.controls.resgatar.reset()
    })
  }

}