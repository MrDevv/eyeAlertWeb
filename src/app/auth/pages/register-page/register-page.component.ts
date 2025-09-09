import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertsService } from '@shared/services/alerts.service';
import { firstValueFrom } from 'rxjs';
import { LoaderComponent } from "@shared/components/loader/loader.component";

@Component({
  selector: 'app-register-page',
  imports: [UpperCasePipe, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['../../shared/styles/auth-styles.css', './register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder)
  public authService = inject(AuthService)
  private alertService = inject(AlertsService)
  private router = inject(Router)

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  get email(){
    return this.registerForm.get('email')
  }

  async onSubmit(){
    console.log(this.registerForm.value);
    
    const {name, lastName, email, password, confirmPassword } = this.registerForm.value;

    if (!this.registerForm.valid) {
      this.alertService.warning( "Campos no válidos" ,"Por favor ingrese datos válidos.")
      return
    }

    if (password !== confirmPassword) {
      this.alertService.warning("Campos no válidos", "Las contraseñas no coinciden")
      return
    }

    try{
      await firstValueFrom(this.authService.register(name, lastName, email, password, confirmPassword))
      this.router.navigateByUrl("/")
    }catch(err: any){
      console.error(err);
      if (err.code == 409) {
        this.alertService.warning("Advertencia", err.message)
      }else{
        this.alertService.error("Error", err.message)
      }
    }

  }

}
