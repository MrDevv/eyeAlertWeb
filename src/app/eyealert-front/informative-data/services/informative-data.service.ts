import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError, Observable, delay, tap, of } from 'rxjs';
import { ResponseHttp } from '../../../shared/interfaces/ResponseHttp';
import { InformativeDataDTO } from '../interfaces/InformativeDataDTO';
import { ContentData } from '../../../shared/interfaces/ContentData';


const BASEURL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class InformativeDataService {

  private readonly http = inject(HttpClient)

  getInformativeDataRandom(size: number = 12): Observable<ResponseHttp<InformativeDataDTO[]>>{
    return this.http.get<ResponseHttp<InformativeDataDTO[]>>(`${BASEURL}/datosInformativos/aleatorios`,{
      params: {
        size
      }
    }).pipe(            
      map((resp) => resp),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(() => err.error)        
      })
    )
  }

  getInformativeData(page: number = 0, size: number = 20){

    return this.http.get<ResponseHttp<ContentData<InformativeDataDTO[]>>>(`${BASEURL}/datosInformativos`, {
      params: {
        page,
        size
      }
    }).pipe(      
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(() => err.error)        
      })
    )
  }
  
}
