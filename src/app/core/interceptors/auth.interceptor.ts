import { AuthService } from './../../auth/services/auth.service';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AlertsService } from "../../shared/services/alerts.service";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {  
    const authService = inject(AuthService)
    const router = inject(Router)
    const authAlerts = inject(AlertsService)
    

    const token = localStorage.getItem('tokenEyeAlert')
  
    const newReq = req.clone({
        headers: req.headers.append('Authorization', token ? `Bearer ${token}` : ''),
    });
    return next(newReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status == 401) {
                authService.logout()
                router.navigateByUrl('/auth/login')
                showAlertSessionExpired(authAlerts)
            }
            if (err.status == 0) {
                showAlertServerUnavailable(authAlerts)
            }
            return throwError(()=> err)
        })
    );
}

function showAlertSessionExpired(alertsService: AlertsService){
    alertsService.warning("Sesión Expirada", "Su sesión expiró, por favor vuelva a iniciar sesión")
}

function showAlertServerUnavailable(alertsService: AlertsService) {
    alertsService.error(
      'Error',
      'El servidor no se encuentra disponible en estos momentos, intentelo más tarde.'
    )
  }