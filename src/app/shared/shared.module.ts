import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from './alerts/alert.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModule,
    NavbarModule
  ]
})
export class SharedModule { }
