import { UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { DataPageable } from '@shared/interfaces/DataPageable';
import { PaginationComponent } from '@shared-eyealert-front/components/pagination/pagination.component';
import { CardEvaluationComponent } from '@shared-eyealert-front/components/card-evaluation/card-evaluation.component';
import { EvaluationDTO } from '@evaluations/interfaces/EvaluationDTO';
import { EvaluationService } from '@evaluations/services/evaluation.service';
import { AuthService } from '@auth/services/auth.service';

enum FilterOptions {
  UltimosSieteDias = 0,
  UltimoMes = 1,
  Todas= 2
}

@Component({
  selector: 'list-evalutions-page',
  imports: [UpperCasePipe, CardEvaluationComponent, LoaderComponent, PaginationComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './list-evalutions-page.component.html',
  styleUrl: './list-evalutions-page.component.css'
})
export class ListEvalutionsPageComponent {

  private readonly queryParam = inject(ActivatedRoute).snapshot.queryParamMap.get('page') ?? 1
  private readonly evaluationService = inject(EvaluationService)
  private readonly authService = inject(AuthService)  
  private readonly fb = inject(FormBuilder)  
  
  public readonly currentPage = signal(Number(this.queryParam))
  private readonly optionFilter = signal<number>(0)

  public readonly filterForm = this.fb.group({
   filter: [0, Validators.required]
  })

  private changeFormValue = effect(( onCleanup ) => {
    const formRegionChanged = this.filterForm.get('filter')!.valueChanges.subscribe(option => {
      this.optionFilter.set(Number(option)!)
    })

    onCleanup(() => {
      formRegionChanged.unsubscribe()      
    })
  })

  get evaluations(): EvaluationDTO[] | undefined {
    return this.resourceEvaluation.value()?.data?.content.evaluaciones
  }

  get dataPagination(): DataPageable | undefined{
    return this.resourceEvaluation.value()?.data?.pageable
  }

  navigateToPage(page: number){
    this.currentPage.set(page)
  }

  resourceEvaluation = rxResource({
    request: () => ({
      userID: this.authService.user()?.id,
      page: this.currentPage() - 1,
      option : this.optionFilter()
    }),
    loader: ({request}) => {
      if(!request.userID) return of()      

      switch(request.option){
        case FilterOptions.UltimosSieteDias:          
          return this.evaluationService.getEvaluationsLastSevenDays(request.userID, request.page)          
        case FilterOptions.UltimoMes:          
          return this.evaluationService.getEvaluationsLastMonth(request.userID, request.page)
        case FilterOptions.Todas:
          return this.evaluationService.getEvaluationsByUser(request.userID, request.page)
        default:
          return of()
      }      
    }
  })
}