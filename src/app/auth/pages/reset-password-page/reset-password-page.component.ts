import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { AlertsService } from '@shared/services/alerts.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-password-page',
  imports: [UpperCasePipe, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['../../shared/styles/auth-styles.css' ,'./reset-password-page.component.css']
})
export class ResetPasswordPageComponent {
  private fb = inject(FormBuilder)
  private alertService = inject(AlertsService)
  private authService = inject(AuthService)
  private token = inject(ActivatedRoute).snapshot.paramMap.get('token')

  public isPasswordChanged = signal(false)
  public isLoading = signal(false)

  public formPassword: FormGroup = this.fb.group({
    password: ['', Validators.required]
  })

  async onSubmit(){
    if (this.formPassword.invalid) {
      this.alertService.warning('Campos incompletos', 'Ingrese una nueva contraseña para continuar.')
      return
    }

    const {password} = this.formPassword.value

    try{
      this.isLoading.set(true)
      await firstValueFrom(this.authService.resetPassword(this.token!, password));
      this.isPasswordChanged.set(true)
    }catch(err: any){
      console.error(err);
      if (err.code == 404) {
        this.alertService.warning("Token no válido",err.message)
      }else{
        this.alertService.error("Error",err.message)
      }
    }
    this.isLoading.set(false)
  }

}