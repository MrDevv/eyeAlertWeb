import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardEvaluationComponent } from "../../../shared/components/card-evaluation/card-evaluation.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { EvaluationService } from '../../services/evaluation.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { of } from 'rxjs';
import { EvaluationDTO } from '../../interfaces/EvaluationDTO';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { DataPageable } from '../../../../shared/interfaces/DataPageable';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'list-evalutions-page',
  imports: [UpperCasePipe, CardEvaluationComponent, LoaderComponent, PaginationComponent, RouterLink],
  templateUrl: './list-evalutions-page.component.html',
  styleUrl: './list-evalutions-page.component.css'
})
export class ListEvalutionsPageComponent {

  queryParam = inject(ActivatedRoute).snapshot.queryParamMap.get('page') ?? 1

  evaluationService = inject(EvaluationService)
  authService = inject(AuthService)  
  currentPage = signal(Number(this.queryParam))


  get evaluations(): EvaluationDTO[] | undefined {
    return this.resourceEvaluation.value()?.data.content.evaluaciones
  }

  get dataPagination(): DataPageable | undefined{    
    return this.resourceEvaluation.value()?.data.pageable
  }

  navigateToPage(page: number){
    this.currentPage.set(page)
  }

  resourceEvaluation = rxResource({
    request: () => ({
      userID: this.authService.user()?.id,
      page: this.currentPage() - 1
    }),
    loader: ({request}) => {
      if(!request.userID) return of()

      return this.evaluationService.getEvaluationsByUser(request.userID, request.page!)
    }
  }) 
}