import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  imports: [RouterLink, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['../../shared/styles/auth-styles.css', './forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent {

  private fb = inject(FormBuilder)

  public formRecoverPassword = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  })

  get email() {
    return this.formRecoverPassword.get('email')
  }

  onSubmit() {
    console.log(this.formRecoverPassword.value);
  }
}
