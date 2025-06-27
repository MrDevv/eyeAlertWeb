import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserDTO } from '../../../../auth/interfaces/UserDTO';

@Component({
  selector: 'card-user-profile',
  imports: [UpperCasePipe],
  templateUrl: './card-user-profile.component.html',  
  styleUrl: './card-user-profile.component.css'
})
export class CardUserProfileComponent {
  user = input.required<UserDTO | null>()  
}
