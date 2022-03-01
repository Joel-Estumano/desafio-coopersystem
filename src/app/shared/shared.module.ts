import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from './alerts/alert.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [AlertModule]
})
export class SharedModule { }
