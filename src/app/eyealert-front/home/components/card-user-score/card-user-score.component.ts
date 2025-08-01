import { I18nPluralPipe, UpperCasePipe } from '@angular/common';
import { Component, input, ResourceRef, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UserDTO } from '@auth/interfaces/UserDTO';

@Component({
  selector: 'card-user-score',
  imports: [UpperCasePipe, RouterLink, I18nPluralPipe],
  templateUrl: './card-user-score.component.html',  
  styleUrl: './card-user-score.component.css'
})
export class CardUserScoreComponent {
  user = input.required<UserDTO | null>()
  scoreUser = input.required<ResourceRef<any | undefined>>()

  pointsMap = signal({
    "=1": "# punto",
    other: "# puntos"
  })

}
