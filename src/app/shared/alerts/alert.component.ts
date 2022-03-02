import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public modalRef?: BsModalRef;
  private subscription: Subscription;
  private message: any;

  constructor(private alertService: AlertService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef) {

    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(message => {
      switch (message && message.type) {
        case 'success':
          this.showSuccess()
          break;
        case 'error':
          this.showError()
          break;
        case 'confirmDelete':

          break;
        case 'loading':
          break;

        case 'wrong':

          break;
      }
      this.message = message;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showSuccess() {
    this.bsModalRef = this.modalService.show(SuccessComponent, { class: 'modal-dialog modal-dialog-centered modal-dialog modal-lg' })
  }

  showError() {
    this.bsModalRef = this.modalService.show(ErrorComponent, { class: 'modal-dialog modal-dialog-centered modal-dialog modal-lg' })
  }
}
