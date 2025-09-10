import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AlertsService } from '../../../../shared/services/alerts.service';
import { firstValueFrom } from 'rxjs';

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
  public readonly isLoading = signal<boolean>(false)

  public readonly showPasswordCurrent = signal<boolean>(false)
  public readonly showNewPassword = signal<boolean>(false)
  public readonly showNewPasswordConfirm = signal<boolean>(false)

  public readonly formUserData: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  public readonly formPassword: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    passwordRepeated: ['', Validators.required]
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

  async onSubmitDataUser(){    
    const {nombres, apellidos, email} = this.formUserData.value
    
    
    if(nombres.length == 0 || apellidos.length == 0 || email.length == 0){
      this.showAlertCamposVacios()
      return
    }

    if(this.formUserData.invalid){
      this.showAlertEmailInvalido()
      return
    }        

    this.isLoading.set(true)

    try{
      const resp = await firstValueFrom(this.authService.updateUsuario(nombres.trim(), apellidos.trim(), email.trim(), this.authService.user()?.id!))

      
      if (resp.code == 200) {
        this.showAlertSuccess(resp.message)
      }      
      
    }catch(err: any){      
      if (err.code == 404) {
        this.showAlertNotFound()
      }
    }    
    
    this.isLoading.set(false)
  }

  async onSubmitPassword(){
    
    const { currentPassword, newPassword, passwordRepeated } = this.formPassword.value

    if (this.formPassword.invalid) {
      this.showAlertCamposVacios()
      return
    }
        
    if (newPassword != passwordRepeated) {
      this.showAlertPasswordsNotMatches()
      return
    }

    this.isLoading.set(true)

    try {
      const resp = await firstValueFrom(this.authService.updatePassword(currentPassword, newPassword, passwordRepeated, this.authService.user()?.id!))

      if(resp.code == 200){
        this.showAlertSuccess(resp.message)
                
        this.formPassword.reset()
      }

    } catch (error: any) {
      console.log(error);
      if (error.code == 400) {
        this.showAlertCurrentPasswordInvalid(error.message)        
      }      
    }

    this.isLoading.set(false)
    
  }

  public isControlInvalid(controlName: string){
    if (this.formUserData.controls[controlName].errors && !this.formUserData.controls[controlName].pristine) {      
      return true
    }
    
    return false    
  }

  private showAlertCurrentPasswordInvalid(message: string){
    this.alertsService.warning("Contraseña actual incorrecta", message)
  }

  private showAlertCamposVacios(){
    this.alertsService.warning("Campos incompletos", "Ingrese todos los campos requeridos para actualizar sus datos.")
  }

  private showAlertEmailInvalido(){
    this.alertsService.warning("Campos Invalidos", "Ingrese un email válido.")
  }

  public showAlertInfoEmail(){
    this.alertsService.info(
      "Importante",
      "Recuerde que este correo es para iniciar sesión en la cuenta, procure ingresar un correo válido."
    )
  }

  private showAlertNotFound(){
    this.alertsService.error(
      "¡Error!",
      "El usuario no fue encontrado"
    )
  }

  private showAlertSuccess(message: string){
    this.alertsService.success(
      "¡Éxito!",
      message
    )
  }

  private showAlertPasswordsNotMatches(){
    this.alertsService.warning("Contraseñas no válidas", "Los campos 'nueva contraseña' y 'confirmar contraseña' no coinciden, por favor revise los datos.")
  }

}
