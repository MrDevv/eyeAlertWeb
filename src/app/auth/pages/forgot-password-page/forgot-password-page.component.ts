import { Component, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import { AlertsService } from '@shared/services/alerts.service';
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgot-password-page',
  imports: [RouterLink, UpperCasePipe, ReactiveFormsModule, LoaderComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['../../shared/styles/auth-styles.css', './forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private alertsService = inject(AlertsService)
  
  public emailSent = signal(false)
  public isLoading = signal(false)


  public formRecoverPassword = this.fb.group({
    email: ['', [Validators.email, Validators.required]]    
  })

  get email() {
    return this.formRecoverPassword.get('email')
  }

  async onSubmit() {
    if (!this.formRecoverPassword.valid) {
      this.alertsService.info("Campos no válidos", "Por favor ingrese un email válido")
      return
    }

    const { email } = this.formRecoverPassword.value;

    try{
      this.isLoading.set(true)
      await firstValueFrom(this.authService.sendEmailResetPassword(email!))
      this.emailSent.set(true)
    }catch(err: any){
      console.error(err);
      if (err.code == 404 ) {
        this.alertsService.warning("¡Advertencia!", err.message)
      }else{
        this.alertsService.error("Error", err.message)
      }
    }

    this.isLoading.set(false)
  }
}
