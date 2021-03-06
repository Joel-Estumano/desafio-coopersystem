import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Investimento } from '../../interfaces/invetimento.interface';
import { InvestimentoService } from '../../services/investimento.service';

@Component({
  selector: 'app-investimentos-list',
  templateUrl: './investimentos-list.component.html',
  styleUrls: ['./investimentos-list.component.scss']
})
export class InvestimentosListComponent implements OnInit {

  public investimentos$: Observable<Investimento[]>

  constructor(private readonly investimentoService: InvestimentoService,
    private readonly router: Router) {
    this.investimentos$ = new Observable()
  }

  ngOnInit(): void {
    this.loadInvestimentos()
  }

  loadInvestimentos() {
    this.investimentos$ = this.investimentoService.get().pipe(tap(console.log));
  }

  goToResgatePersonalizado(investimento: Investimento) {
    if (investimento.indicadorCarencia === 'N') {
      const navigationExtras: NavigationExtras = {
        state: {
          data: investimento
        }
      }
      this.router.navigate(['/invetimentos/resgate'], navigationExtras)
    }
  }
}