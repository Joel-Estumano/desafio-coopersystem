import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly apiURL: string;

    constructor(private httpClient: HttpClient) {
        this.apiURL = 'https://run.mocky.io/v3/';
    }

    public getData(url: string): Observable<any[]> {
        return this.httpClient.get<any[]>(this.apiURL + url, {
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            catchError(this.handleError<any[]>('get', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}