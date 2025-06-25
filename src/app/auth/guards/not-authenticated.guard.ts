import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const NotAutheticatedGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    const isAuthenticated = authService.authStatus()
    
    if (isAuthenticated == 'authenticated' || isAuthenticated == 'checking') {
        router.navigateByUrl('/home')
        return false
    }

    return true;
}