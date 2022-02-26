import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class InvestimentoService {

  constructor(private httpService: HttpService) { }

  public get(): Observable<any> {
    return this.httpService.get().pipe(
      map(response => {
        return this.getData(response)
      })
    );
  }

  private getData(response: any) {
    return response.response.data.listaInvestimentos || {};
  }
}
