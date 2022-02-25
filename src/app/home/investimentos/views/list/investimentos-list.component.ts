import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { InvestimentoService } from '../../services/investimento.service';

@Component({
  selector: 'app-investimentos-list',
  templateUrl: './investimentos-list.component.html',
  styleUrls: ['./investimentos-list.component.scss']
})
export class InvestimentosListComponent implements OnInit {

  public listaInvestimentos: any;
  public load = true;

  constructor(private readonly investimentoService: InvestimentoService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.loadInvestimentos();
  }

  loadInvestimentos() {
    this.investimentoService.get().subscribe(res => {
      if (res.response.status == '200') {
        this.listaInvestimentos = res.response.data.listaInvestimentos;
        this.load = false;
      } else {
        console.log('failed to retrieve data')
      }
    });
  }

  goToResgatePersonalizado(investimento: any) {
    if (investimento.indicadorCarencia === 'N') {
      const navigationExtras: NavigationExtras = {
        state: {
          model: investimento,
        },
      };
      this.router.navigate(['/resgate'], navigationExtras);
    }
  }
}
