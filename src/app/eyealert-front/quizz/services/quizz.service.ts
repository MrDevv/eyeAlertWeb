import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { ResponseHttp } from '../../../shared/interfaces/ResponseHttp';
import { ResponseRanking } from '../interfaces/ResponseRanking';

const BASEURL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private readonly http = inject(HttpClient);
  
  public getScoreUser(usuarioId: number){
    return this.http.get(`${BASEURL}/usuarios/${usuarioId}/puntaje`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    )
  }

  public getRanking(): Observable<ResponseHttp<ResponseRanking>>{
    return this.http.get<ResponseHttp<ResponseRanking>>(`${BASEURL}/quizzes/ranking`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    )
  }
}
