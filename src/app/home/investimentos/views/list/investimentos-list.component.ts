import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { InvestimentoService } from '../../services/investimento.service';

@Component({
  selector: 'app-investimentos-list',
  templateUrl: './investimentos-list.component.html',
  styleUrls: ['./investimentos-list.component.scss']
})
export class InvestimentosListComponent implements OnInit {

  public investimentos$: any;

  constructor(private readonly investimentoService: InvestimentoService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.loadInvestimentos();
  }

  loadInvestimentos() {
    this.investimentos$ = this.investimentoService.get();
  }

  goToResgatePersonalizado(investimento: any) {
    if (investimento.indicadorCarencia === 'N') {
      const navigationExtras: NavigationExtras = {
        state: {
          data: investimento,
        },
      };
      this.router.navigate(['/resgate'], navigationExtras);
    }
  }
}
