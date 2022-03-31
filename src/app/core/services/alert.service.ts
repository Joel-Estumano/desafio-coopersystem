import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  public getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  public success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', message: message });
  }

  public error(message: string, erros: any[], keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', message: message, erros: erros });
  }

  public clear() {
    this.subject.next({});
  }

  public confirmDelete(message: string, keepAfterRouteChange = false, object: object) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'confirmDelete', text: message, object: object });
  }

  public showLoading(keepAfterRouteChange = false) {
    this.clear();
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'loading' });
  }

  public showWrong(keepAfterRouteChange = false) {
    this.clear();
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'wrong' });
  }
}