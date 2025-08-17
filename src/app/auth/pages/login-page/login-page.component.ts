import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { AuthService } from '@auth/services/auth.service';
import { AlertsService } from '@shared/services/alerts.service';

@Component({
  selector: 'app-login-page',
  imports: [LoaderComponent, UpperCasePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: [ '../../shared/styles/auth-styles.css', './login-page.component.css']
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  authService = inject(AuthService);
  alertsService = inject(AlertsService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email(){
    return this.loginForm.get('email')
  }

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
      'Por favor ingrese datos válidos, revise los datos que ingresó'
    );
  }
}
