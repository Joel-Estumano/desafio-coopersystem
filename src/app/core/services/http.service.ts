import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly apiURL: string;

    constructor(private httpClient: HttpClient) {
        this.apiURL = 'https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653';
    }

    public get(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.apiURL, {
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