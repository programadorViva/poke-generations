import { Service } from './../../../shared/services/service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }


  public getGenerations(): Observable<any>{
    return this.http.get<any>(`https://pokeapi.co/api/v2/generation/`,
    {headers: this.headers})
    .pipe(
      map((res:any) =>{
        return res
      }),
      catchError(
        (error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

  public getPokemons(url): Observable<any>{
    return this.http.get<any>(url,
    {headers: this.headers})
    .pipe(
      map((res:any) =>{
        return res
      }),
      catchError(
        (error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }


}
