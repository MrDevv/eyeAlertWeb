import { UpperCasePipe } from '@angular/common';
import { Component, input, ResourceRef } from '@angular/core';
import { UserDTO } from '../../../../auth/interfaces/UserDTO';

@Component({
  selector: 'card-user-score',
  imports: [UpperCasePipe],
  templateUrl: './card-user-score.component.html',  
  styleUrl: './card-user-score.component.css'
})
export class CardUserScoreComponent {
  user = input.required<UserDTO | null>()
  scoreUser = input.required<ResourceRef<any | undefined>>()
}
