import { Component, inject, input, ResourceRef } from '@angular/core';

import { ResponseHttp } from '@shared/interfaces/ResponseHttp';
import { AlertsService } from '@shared/services/alerts.service';
import { ResponseRanking, ranking } from '@quizz/interfaces/ResponseRanking';

@Component({
  selector: 'card-user-ranking',
  imports: [],
  templateUrl: './card-user-ranking.component.html',
  styleUrl: './card-user-ranking.component.css'
})
export class CardUserRankingComponent {
  public readonly ranking = input.required<ResourceRef<ResponseHttp<ResponseRanking> | undefined>>()

  private alertsServie = inject(AlertsService);

  get rankingValue(): ranking[] | undefined {            
    return this.ranking().value()?.data?.ranking
  }

  get puestoUsuario(): ranking | undefined {        
    return this.ranking().value()?.data?.puesto_usuario
  }

  showAlertInfoRanking(){
    this.alertsServie.info(
      "Sistema de Ranking",
      "El ranking se actualiza automáticamente al inicio de cada mes. Si dos o más usuarios obtienen el mismo puntaje, tendrá prioridad en el puesto aquel que alcanzó dicho puntaje primero."
    )
  }
}
