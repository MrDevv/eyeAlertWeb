import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [LoaderComponent, UpperCasePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  authService = inject(AuthService);
  alertsService = inject(AlertsService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;    
        
    
    if (email?.length == 0 || password?.length == 0) {            
      this.showAlertImcompleteFields();
      return;
    }

    if (this.loginForm.invalid) {
      this.showAlertInvalidFields();
      return;
    }

    this.authService.login(email!, password!).subscribe({
      next: () => {        
          this.router.navigateByUrl('/');          
      },
      error: (err) => {                
        if(err.code == 404){                    
          this.showAlertIncorrectCredentials()
          return
        }
      },
    });
  }

  showAlertIncorrectCredentials() {
    this.alertsService.warning(
      'Credenciales Incorrectas',
      this.authService.messageResponse()!
    );
  }



  showAlertImcompleteFields() {
    this.alertsService.warning(
      'Campos Incompletos',
      'Por favor ingrese los campos necesarios'
    );
  }

  showAlertInvalidFields() {
    this.alertsService.warning(
      'Campos no válidos',
      'Por favor ingrese revise los datos que ingresó'
    );
  }
}
