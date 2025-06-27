import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { ResponseHttpDTO } from '../../../shared/interfaces/ResponseHttpDTO';
import { ResponseErrorHttpDTO } from '../../../shared/interfaces/ResponseErrorHttpDTO';
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
