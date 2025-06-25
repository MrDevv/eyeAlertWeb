import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { UserDTO } from '../interfaces/UserDTO';
import { ResponseLoginDTO } from '../interfaces/ResponseLoginDTO';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/auth/login');
  }

  checkStatus(): void {    
    const token = localStorage.getItem('tokenEyeAlert');

    if (!token) {            
      this.logout()          
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
