import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AlertsService } from '../../../../shared/services/alerts.service';

@Component({
  selector: 'app-edit-profile',
  imports: [UpperCasePipe, LoaderComponent, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  public readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly alertsService = inject(AlertsService)

  public readonly showPasswordCurrent = signal<boolean>(false)
  public readonly showNewPassword = signal<boolean>(false)
  public readonly showNewPasswordConfirm = signal<boolean>(false)

  public readonly formUserData: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(){
    effect(() => {
      this.setInitialDataUser()
    })
  }


  setInitialDataUser(){
    if(!this.authService.user()) return

    this.formUserData.get('nombres')?.setValue(this.authService.user()?.nombres!)

    this.formUserData.get('apellidos')?.setValue(this.authService.user()?.apellidos!)

    this.formUserData.get('email')?.setValue(this.authService.user()?.email!)
  }

  onSubmitDataUser(){
    const {nombres, apellidos, email} = this.formUserData.value    
    
    if(nombres.length == 0 || apellidos.length == 0 || email.length == 0){
      this.showAlertCamposVacios()
      return
    }

    if(this.formUserData.invalid){
      this.showAlertEmailInvalido()
      return
    }    

    console.log(this.formUserData.value);
    
  }

  isControlInvalid(controlName: string){
    if (this.formUserData.controls[controlName].errors && !this.formUserData.controls[controlName].pristine) {      
      return true
    }
    
    return false    
  }

  showAlertCamposVacios(){
    this.alertsService.warning("Campos incompletos", "Ingrese todos los campos requeridos para actualizar sus datos.")
  }

  showAlertEmailInvalido(){
    this.alertsService.warning("Campos Invalidos", "Ingrese un email válido.")
  }

  showAlertInfoEmail(){
    this.alertsService.info(
      "Importante",
      "Recuerde que este correo es para iniciar sesión en la cuenta, procure ingresar un correo válido."
    )
  }

}
