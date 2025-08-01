import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, delay, Observable, tap, throwError } from 'rxjs';
import { ResponseHttp } from '../../../shared/interfaces/ResponseHttp';
import { ResponseRanking } from '../interfaces/ResponseRanking';
import { Quizz } from '@quizz/interfaces/Quizz';

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

  public getPreguntas(): any{
    return this.http.get(`${BASEURL}/preguntas-quizz`).pipe(
      delay(2000),
      tap(resp => console.log(resp)),
      catchError(err => {
        return throwError(() => err)
      })
    )
  }

  public saveQuizz(puntaje: number, userId: number): Observable<ResponseHttp<Quizz>> {
    return this.http.post<ResponseHttp<Quizz>>(`${BASEURL}/quizzes`, {
      puntaje,
      usuario_id: userId
    }).pipe(
      delay(5000),
      tap(resp => console.log(resp)),
      catchError(err => {
        return throwError(() => err.error)
      })
    )
  }
}
