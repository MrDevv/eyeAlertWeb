import { SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, input, ResourceRef } from '@angular/core';
import { AlertsService } from '../../../../shared/services/alerts.service';
import { ResponseHttpDTO } from '../../../../shared/interfaces/ResponseHttpDTO';
import { InformativeDataDTO } from '../../../informative-data/interfaces/InformativeDataDTO';
import { EvaluationsByUserDTO } from '../../../evaluations/interfaces/EvaluationsByUserDTO';
import { CardEvaluationComponent } from '../../../shared/components/card-evaluation/card-evaluation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'main-data',
  imports: [RouterLink, SlicePipe, CardEvaluationComponent, UpperCasePipe],
  templateUrl: './main-data.component.html',  
  styleUrl: './main-data.component.css'
})
export class MainDataComponent {
  lastestEvaluations = input.required<ResourceRef<ResponseHttpDTO<EvaluationsByUserDTO> | undefined>>()  
  informativeDataRandom = input.required<ResourceRef<ResponseHttpDTO<InformativeDataDTO[]> | undefined>>()

  alertsService = inject(AlertsService)

  constructor(){    
    effect(() => {
      const error: any = this.informativeDataRandom().error()
      if (error?.status == 500) {      
        console.log(error);
        this.showAlertErrorInternalServer()
      }
    })
  }

  showAlertErrorInternalServer(){
    this.alertsService.error(
      "Error en Servidor", 
      "Ocurrió un error al momento de intentar traer los datos informativos, intentelo más tarde"
    )    
  }
  
}
