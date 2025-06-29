import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError, Observable, delay } from 'rxjs';
import { ResponseHttpDTO } from '../../../shared/interfaces/ResponseHttpDTO';
import { InformativeDataDTO } from '../interfaces/InformativeDataDTO';


const BASEURL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class InformativeDataService {

  http = inject(HttpClient)

  getInformativeDataRandom(): Observable<ResponseHttpDTO<InformativeDataDTO[]>>{
    return this.http.get<ResponseHttpDTO<InformativeDataDTO[]>>(`${BASEURL}/datosInformativos/aleatorios`).pipe(            
      map((resp) => resp),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(() => err.error)        
      })
    )
  }
  
}
