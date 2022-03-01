import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  private message: any;

  constructor(private alertService: AlertService) {
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
    alert('[' + message.toUpperCase() + '] - Esta função está em manutenção...')
  }
}
