import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'card-user-profile',
  imports: [UpperCasePipe],
  templateUrl: './card-user-profile.component.html',  
  styleUrl: './card-user-profile.component.css'
})
export class CardUserProfileComponent {

}
