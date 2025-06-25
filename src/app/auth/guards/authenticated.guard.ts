import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const router = inject(Router)    
    const authService = inject(AuthService)
    const isAuthenticated = authService.authStatus()
        
    if(isAuthenticated == 'not-authenticated'){
        router.navigateByUrl('/auth/login')
        return false
    }    

    return true;
}