import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { ResponseHttpDTO } from '../../../shared/interfaces/ResponseHttpDTO';
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
  
  getLastestEvaluation(userId: number): Observable<ResponseHttpDTO<EvaluationsByUserDTO>>{                
    return this.http.get<ResponseHttpDTO<EvaluationsByUserDTO>>(`${BASEURL}/usuarios/${userId}/evaluaciones/latest?size=4`).pipe(      
      catchError((err: ResponseErrorHttpDTO) => {        
        return throwError(() => err)
      })
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
