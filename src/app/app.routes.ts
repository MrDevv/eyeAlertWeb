import { Routes } from '@angular/router';
import { EyeAlertFrontLayoutComponent } from './eyealert-front/layouts/eye-alert-front-layout/eye-alert-front-layout.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./eyealert-front/eyealert-front.routes')
    }
];
