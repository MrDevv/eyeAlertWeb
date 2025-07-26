import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';


const BASEURL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private readonly http = inject(HttpClient);
  
  public getScoreUser(usuarioId: number){
    return this.http.get(`${BASEURL}/usuarios/${usuarioId}/puntaje`).pipe(
      tap(resp => console.log(resp)),
      catchError(err => {
        return throwError(() => err);
      })
    )
  }
}
