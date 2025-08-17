import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ForgotPasswordPageComponent } from "./pages/forgot-password-page/forgot-password-page.component";
import { ResetPasswordPageComponent } from "./pages/reset-password-page/reset-password-page.component";

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { 
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'register',
                component: RegisterPageComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordPageComponent
            },
            {
                path: 'reset-password/:token',
                component: ResetPasswordPageComponent                
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
]

export default routes;