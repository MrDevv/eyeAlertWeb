import { ContentData } from './../../../shared/interfaces/ContentData';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseHttp } from '../../../shared/interfaces/ResponseHttp';
import { ResponseErrorHttpDTO } from '../../../shared/interfaces/ResponseErrorHttpDTO';
import { EvaluationsByUserDTO } from '../interfaces/EvaluationsByUserDTO';
import { EvaluationPredictDTO } from '../interfaces/EvaluationPredictDTO';
import { EvaluationResultDTO } from '../interfaces/EvaluationResultDTO';


const BASEURL = environment.baseUrl
const baseUrlML = environment.baseUrlML 

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private http = inject(HttpClient)  
  
  getLastestEvaluation(userId: number): Observable<ResponseHttp<EvaluationsByUserDTO>>{                
    return this.http.get<ResponseHttp<EvaluationsByUserDTO>>(`${BASEURL}/usuarios/${userId}/evaluaciones/latest?size=4`).pipe(      
      catchError((err: ResponseErrorHttpDTO) => {        
        return throwError(() => err)
      })
    )
  }

  getEvaluationsByUser(userId: number, page: number = 0, size: number = 25):Observable<ResponseHttp<ContentData<EvaluationsByUserDTO>>>{
    return this.http.get<ResponseHttp<ContentData<EvaluationsByUserDTO>>>(`${BASEURL}/usuarios/${userId}/evaluaciones`, {
      params: {
        page,
        size
      }
    }).pipe(
      tap(resp => console.log(resp))
    )
  }

  getQuestionsEvaluation(){
    return this.http.get(`${BASEURL}/preguntas`).pipe(
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(() => err)
      })
    )
  }

  prediction(dataEvaluation: EvaluationPredictDTO): Observable<EvaluationResultDTO>{
    return this.http.post<EvaluationResultDTO>(`${baseUrlML}/evaluation`, dataEvaluation).pipe(
      tap((resp) => {
        console.log(resp);        
      }),
      catchError((err: ResponseErrorHttpDTO) => {
        return throwError(() => err)
      })
    )
  }
}
