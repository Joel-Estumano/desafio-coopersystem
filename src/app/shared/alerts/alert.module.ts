import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AlertComponent,
    SuccessComponent,
    ErrorComponent
  ],
  entryComponents: [AlertComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent,
    SuccessComponent,
    ErrorComponent
  ]
})
export class AlertModule { }
