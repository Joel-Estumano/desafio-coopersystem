import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @ViewChild('mymodal') mymodal: any;

  private subscription: Subscription;
  private message: any;

  constructor(private alertService: AlertService,
    private modalService: NgbModal) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(message => {
      switch (message && message.type) {
        case 'success':
          this.openModalSuccess(message.text)
          break;
        case 'error':

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

  openModalSuccess(message: string) {
    this.open(this.mymodal)
  }


  closeResult: string | null = null;

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
