import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttpDTO } from '../../interfaces/ResponseHttpDTO';
import { ResponseErrorHttpDTO } from '../../interfaces/ResponseErrorHttpDTO';
import { EvaluationsByUserDTO } from '../interfaces/EvaluationsByUserDTO';


const BASEURL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  http = inject(HttpClient)
  authService = inject(AuthService)
  
  getLastestEvaluation(userId: number): Observable<ResponseHttpDTO<EvaluationsByUserDTO>>{                
    return this.http.get<ResponseHttpDTO<EvaluationsByUserDTO>>(`${BASEURL}/usuarios/${userId}/evaluaciones/latest?size=4`).pipe(      
      map((resp) => {
        return resp
      }),
      catchError((err: ResponseErrorHttpDTO) => {        
        return throwError(() => err)
      })
    )
  }
}
