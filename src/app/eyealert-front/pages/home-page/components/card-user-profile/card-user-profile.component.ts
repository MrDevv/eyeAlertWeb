import { UpperCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../../auth/services/auth.service';
import { UserDTO } from '../../../../../auth/interfaces/UserDTO';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'card-user-profile',
  imports: [UpperCasePipe],
  templateUrl: './card-user-profile.component.html',  
  styleUrl: './card-user-profile.component.css'
})
export class CardUserProfileComponent {
  user = input.required<UserDTO | null>()

  ngOnInit(){
    console.log(`usuario: ${this.user()}`);
  }
}
