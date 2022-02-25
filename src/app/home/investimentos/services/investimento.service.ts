import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class InvestimentoService {

  constructor(private httpService: HttpService) { }

  public get(): Observable<any> {
    return this.httpService.get();
  }

}
