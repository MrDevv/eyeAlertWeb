import { Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CardUserProfileComponent } from '../../components/card-user-profile/card-user-profile.component';
import { CardUserScoreComponent } from '../../components/card-user-score/card-user-score.component';
import { CardUserRankingComponent } from '../../components/card-user-ranking/card-user-ranking.component';
import { MainDataComponent } from '../../components/main-data/main-data.component';
import { AuthService } from '../../../../auth/services/auth.service';
import { InformativeDataService } from '../../../informative-data/services/informative-data.service';
import { EvaluationService } from '@evaluations/services/evaluation.service';
import { QuizzService } from '@quizz/services/quizz.service';

@Component({
  selector: 'app-home-page',
  imports: [CardUserProfileComponent, CardUserScoreComponent, CardUserRankingComponent, MainDataComponent],
  templateUrl: './home-page.component.html',  
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {      
  authServices = inject(AuthService)
  evaluationService = inject(EvaluationService)
  informativeDataService = inject(InformativeDataService)
  quizzService = inject(QuizzService)

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
      return this.informativeDataService.getInformativeDataRandom()
    }    
  })

  scoreDataResource = rxResource({
    request: () => ({userId: this.authServices.user()?.id}),
    loader: ({request}) => {
      if(!request.userId) return of(undefined)
      return this.quizzService.getScoreUser(request.userId);
    }
  })

  rankingResource = rxResource({
    loader: () => {
      return this.quizzService.getRanking();
    }
  })

}
