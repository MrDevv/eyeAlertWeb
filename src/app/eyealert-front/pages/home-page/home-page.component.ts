import { Component, inject } from '@angular/core';

import { CardUserProfileComponent } from "./components/card-user-profile/card-user-profile.component";
import { CardUserScoreComponent } from "./components/card-user-score/card-user-score.component";
import { CardUserRankingComponent } from "./components/card-user-ranking/card-user-ranking.component";
import { MainDataComponent } from "./components/main-data/main-data.component";
import { AuthService } from '../../../auth/services/auth.service';
import { EvaluationService } from '../../services/evaluation.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { InformativeDataService } from '../../services/informative-data.service';

@Component({
  selector: 'app-home-page',
  imports: [CardUserProfileComponent, CardUserScoreComponent, CardUserRankingComponent, MainDataComponent],
  templateUrl: './home-page.component.html',  
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {      
  authServices = inject(AuthService)
  evaluationService = inject(EvaluationService)
  informativeData = inject(InformativeDataService)

  lastEvaluationsResource = rxResource({
    request: () => ({userId: this.authServices.user()?.id}),
    loader: ({request}) => {
      if(!request.userId) return of(undefined)

      return this.evaluationService.getLastestEvaluation(request.userId!)    
    }
  })

  informativeDataRandomResource = rxResource({
    request: () => ({}),
    loader: ({request}) =>{
      const resp = this.informativeData.getInformativeDataRandom()            
      return resp
    }    
  })

}
