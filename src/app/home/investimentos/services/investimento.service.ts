import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class InvestimentoService {

  private id = 'ca4ec77d-b941-4477-8a7f-95d4daf7a653'

  constructor(private httpService: HttpService) { }

  public get(): Observable<any> {
    return this.httpService.getData(this.id).pipe(
      map(response => {
        return this.getData(response)
      })
    );
  }

  private getData(response: any) {
    return response.response.data.listaInvestimentos || [];
  }
}
