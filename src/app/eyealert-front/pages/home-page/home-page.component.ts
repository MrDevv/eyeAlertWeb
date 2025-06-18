import { Component } from '@angular/core';

import { CardUserProfileComponent } from "./components/card-user-profile/card-user-profile.component";
import { CardUserScoreComponent } from "./components/card-user-score/card-user-score.component";
import { CardUserRankingComponent } from "./components/card-user-ranking/card-user-ranking.component";
import { MainDataComponent } from "./components/main-data/main-data.component";

@Component({
  selector: 'app-home-page',
  imports: [CardUserProfileComponent, CardUserScoreComponent, CardUserRankingComponent, MainDataComponent],
  templateUrl: './home-page.component.html',  
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
