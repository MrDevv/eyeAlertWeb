import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environment';

import { EvaluationsByUserDTO } from '@evaluations/interfaces/EvaluationsByUserDTO';
import { ResponseHttp } from '@shared/interfaces/ResponseHttp';
import { ResponseErrorHttpDTO } from '@shared/interfaces/ResponseErrorHttpDTO';
import { ContentData } from '@shared/interfaces/ContentData';
import { EvaluationPredictDTO } from '@evaluations/interfaces/EvaluationPredictDTO';
import { EvaluationResultDTO } from '@evaluations/interfaces/EvaluationResultDTO';
import { SaveEvaluation } from '@evaluations/interfaces/SaveEvaluation';
import { EvaluationDTO } from '@evaluations/interfaces/EvaluationDTO';


const BASEURL = environment.baseUrl
const baseUrlML = environment.baseUrlML

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private http = inject(HttpClient)

  public getLastestEvaluation(userId: number): Observable<ResponseHttp<EvaluationsByUserDTO>>{
    return this.http.get<ResponseHttp<EvaluationsByUserDTO>>(`${BASEURL}/usuarios/${userId}/evaluaciones/latest?size=4`).pipe(
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(() => err)
      })
    )
  }

  public getEvaluationsByUser(userId: number, page: number = 0, size: number = 25):Observable<ResponseHttp<ContentData<EvaluationsByUserDTO>>>{
    return this.http.get<ResponseHttp<ContentData<EvaluationsByUserDTO>>>(`${BASEURL}/usuarios/${userId}/evaluaciones`, {
      params: {
        page,
        size
      }
    }).pipe(
      tap(resp => console.log(resp)),
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(()=> err)
      })
    )
  }

  public getEvaluationsLastSevenDays(userId: number, page: number = 0, size: number = 25){
    return this.http.get<ResponseHttp<ContentData<EvaluationsByUserDTO>>>(`${BASEURL}/usuarios/${userId}/evaluaciones/latest-seven-days`, {
      params: {
        page,
        size
      }
    }).pipe(
      tap(resp => console.log(resp)),
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(()=> err)
      })
    )
  }

    public getEvaluationsLastMonth(userId: number, page: number = 0, size: number = 25){
    return this.http.get<ResponseHttp<ContentData<EvaluationsByUserDTO>>>(`${BASEURL}/usuarios/${userId}/evaluaciones/last-month`, {
      params: {
        page,
        size
      }
    }).pipe(
      tap(resp => console.log(resp)),
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(()=> err)
      })
    )
  }

  public getQuestionsEvaluation(){
    return this.http.get(`${BASEURL}/preguntas`).pipe(
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(() => err)
      })
    )
  }

  public prediction(dataEvaluation: EvaluationPredictDTO): Observable<EvaluationResultDTO>{
    return this.http.post<EvaluationResultDTO>(`${baseUrlML}/evaluation`, dataEvaluation).pipe(      
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(() => err)
      })
    )
  }

  public saveEvaluation(evaluation: SaveEvaluation){
    return this.http.post<ResponseHttp<EvaluationDTO>>(`${BASEURL}/evaluaciones`, evaluation)
    .pipe(
      tap(resp => console.log(resp)),
      catchError(err => {
        return throwError(() => err.error)
      })
    )
  }
}
