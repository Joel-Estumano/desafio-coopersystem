import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit {

  public model: any;
  public acoes: any[] = [];

  public form: FormGroup;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) {

    this.form = this.fb.group({
      valorResgate: [null, [Validators.required]]
    });

    if (this.router.getCurrentNavigation() != null) {
      const currentState = this.router.getCurrentNavigation()?.extras?.state;
      if (!currentState?.['model']) {
        this.goToLista();
      }
      this.model = currentState?.['model'];
      console.log(this.model)


    }
  }

  ngOnInit(): void {
    this.loadAcoes();
  }

  loadAcoes() {
    if (this.model.acoes) {
      this.acoes = this.model.acoes;
    }
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

  addToAllChange(value: any) {

  }

}
