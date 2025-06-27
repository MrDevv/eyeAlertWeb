import { Routes } from '@angular/router';
import { NotAutheticatedGuard } from './core/guards/not-authenticated.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch: [
            NotAutheticatedGuard
        ]
    },
    {
        path: '',
        loadChildren: () => import('./eyealert-front/eyealert-front.routes'),
            canMatch: [
            AuthenticatedGuard
        ],
    }
];
