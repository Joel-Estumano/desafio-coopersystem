import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '', component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'invetimentos' },
			{ path: 'invetimentos', loadChildren: () => import('./investimentos/investimentos.module').then(m => m.InvestimentosModule) }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {
}
