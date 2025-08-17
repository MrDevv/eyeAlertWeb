import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, last, map, Observable, of, tap, throwError } from 'rxjs';
import { UserDTO } from '../interfaces/UserDTO';
import { ResponseLoginDTO } from '../interfaces/ResponseLoginDTO';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ResponseHttp } from '../../shared/interfaces/ResponseHttp';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const BASEURL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<UserDTO | null>(null);
  private _messageResponse = signal<string | null>(null);
  private _token = signal<string | null>(localStorage.getItem('tokenEyeAlert'));

  private http = inject(HttpClient);
  private router = inject(Router);

  user = computed(() => this._user());
  messageResponse = computed(() => this._messageResponse());
  authStatus = computed(() => this._authStatus());
  token = computed(() => this._token());

  login(email: string, password: string) {    
    this._authStatus.set('checking');
    return this.http
      .post<ResponseLoginDTO>(`${BASEURL}/auth/login`, {
        email,
        password,
      })
      .pipe(        
        tap((resp) => {
          const { data } = resp;          
          this.successLogin(data!)
        }),
        catchError((error: HttpErrorResponse) => {
          this.clearDataUser()
          this._messageResponse.set(error.error.message);
          return throwError(() => error.error);
        })
      );
  }

  logout() {    
    this.clearDataUser()
    localStorage.removeItem('tokenEyeAlert');
    this.router.navigateByUrl('auth/login')
  }

  checkStatus(): void {    
    const token = localStorage.getItem('tokenEyeAlert');

    if (!token) {            
      this.clearDataUser()
      localStorage.removeItem('tokenEyeAlert');
      return
    }
        
    this.http.get<ResponseLoginDTO>(`${BASEURL}/auth/validate-token`).pipe(                  
      tap((resp) => {    
        const { data } = resp;
        this.successLogin(data!)
      }),
      catchError((error: HttpErrorResponse) => {                                
        return throwError(() => error);
      })
    ).subscribe()    
  }

  public updateUsuario(nombres: string, apellidos: string, email: string, userId: number): Observable<ResponseHttp<UserDTO>>{
    return this.http.put<ResponseHttp<UserDTO>>(`${BASEURL}/usuarios/${userId}`, {
      nombres,
      apellidos,
      email
    }).pipe(      
      map(resp => {
        const {data } = resp        
        this.successLogin(data!)
        return resp        
      }),
      catchError((err: HttpErrorResponse) => {        
        return throwError(() => err.error)
      })
    )
  }

  public updatePassword(currentPassword: string, newPassword: string, passwordRepeated: string, userId: number): Observable<ResponseHttp<null>>{
    return this.http.patch<ResponseHttp<null>>(`${BASEURL}/usuarios/${userId}/update-password`, {
      contraseña_actual: currentPassword,
      nueva_contraseña: newPassword,
      contraseña_repetida: passwordRepeated
    }).pipe(      
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error)
      })
    )
  }

  public register(name: string, lastName: string, email: string, password: string, repeatedPassword: string): Observable<ResponseHttp<UserDTO>>{
    return this.http.post<ResponseHttp<UserDTO>>(`${BASEURL}/auth/create-usuario`, {
      nombres: name,
      apellidos: lastName,
      email,
      password,
      password_repetida: repeatedPassword
    }).pipe(
      tap((resp) => {
        const { data } = resp;
        this.successLogin(data!)
        console.log(resp)
      }),
      catchError((err: HttpErrorResponse) => {
        this.clearDataUser()
        return throwError(() => err.error)
      })
    )
  }

  successLogin(data: UserDTO){    
      this._user.set(data)
      this._token.set(data!.jwt)
      this._authStatus.set('authenticated')                
      localStorage.setItem('tokenEyeAlert', data!.jwt);
  }

  clearDataUser(){
      this._user.set(null);
      this._token.set(null);
      this._authStatus.set('not-authenticated');
  }
}
