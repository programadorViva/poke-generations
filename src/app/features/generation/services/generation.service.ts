import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/shared/services/service';

@Injectable({
  providedIn: 'root'
})
export class GenerationService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  
  public getPokemons(id): Observable<any>{
    return this.http.get<any>(`https://pokeapi.co/api/v2/generation/${id}`,
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
  
  public getDetailPokemon(name): Observable<any>{
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}/`,
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
