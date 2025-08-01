import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const IsAdminGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {

    const authService = inject(AuthService)

    const isAdmin = authService.user()?.rol == "administrador"

    return isAdmin;
}