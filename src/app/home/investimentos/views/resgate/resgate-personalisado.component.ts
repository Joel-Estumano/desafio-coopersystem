import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resgate-personalisado',
  templateUrl: './resgate-personalisado.component.html',
  styleUrls: ['./resgate-personalisado.component.scss']
})
export class ResgatePersonalisadoComponent implements OnInit {

  public model: any;
  public acoes: any[] = [];

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router) {
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

}
