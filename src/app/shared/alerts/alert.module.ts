import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CommonModule,
    NgbModule
  ],
  exports: [AlertComponent,
    SuccessComponent,
    ErrorComponent
  ]
})
export class AlertModule { }
