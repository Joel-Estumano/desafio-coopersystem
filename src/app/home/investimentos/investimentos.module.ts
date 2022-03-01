import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestimentoService } from './services/investimento.service';
import { InvestimentosListComponent } from './views/list/investimentos-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ResgatePersonalisadoComponent } from './views/resgate/resgate-personalisado.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: InvestimentosListComponent },
  { path: 'resgate', component: ResgatePersonalisadoComponent }
]

@NgModule({
  declarations: [
    InvestimentosListComponent,
    ResgatePersonalisadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [InvestimentoService]
})
export class InvestimentosModule { }
