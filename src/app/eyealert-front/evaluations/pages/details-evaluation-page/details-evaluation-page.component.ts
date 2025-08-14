import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { EvaluationService } from '@evaluations/services/evaluation.service';
import { AuthService } from '@auth/services/auth.service';
import { Location } from '@angular/common';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'details-evaluation-page',
  imports: [LoaderComponent],
  templateUrl: './details-evaluation-page.component.html',
  styleUrl: './details-evaluation-page.component.css'
})
export class DetailsEvaluationPageComponent {
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id');
  private evaluationService = inject(EvaluationService);
  private router = inject(Router)
  private location = inject(Location)
  private authService = inject(AuthService)

  public userRol = computed(()=> this.authService.user()?.rol)  

  get fecha(){
    return this.evaluationDetailsResource.value()?.data?.fecha.split(' ')[0]
  }

  get hora(){
    return this.evaluationDetailsResource.value()?.data?.fecha.split(' ')[1]
  }

  get riesgo(){
    return this.evaluationDetailsResource.value()?.data?.resultado
  }

  get edad() {
    return this.evaluationDetailsResource.value()?.data?.listPreguntaRespuesta[0].respuesta
  }

  get genero() {
    return this.evaluationDetailsResource.value()?.data?.listPreguntaRespuesta[1].respuesta
  }

  get tiempoPrediccionInicio() {
    return this.evaluationDetailsResource.value()?.data?.tiempo_prediccion_inicio.split(' ')[1]
  }

  get tiempoPrediccionFin() {
    return this.evaluationDetailsResource.value()?.data?.tiempo_prediccion_fin.split(' ')[1]
  }

  get tiempoPrediccion() {
    return this.evaluationDetailsResource.value()?.data?.tiempo_prediccion
  }

  get resultadoEvaluacion() {
    return this.evaluationDetailsResource.value()?.data?.resultado
  }

  get resultadoEspecialista() {
    return this.evaluationDetailsResource.value()?.data?.resultado_especialista
  }

  public toBack() {
    this.location.back()
  }

  public evaluationDetailsResource = rxResource({
    request: () => ({evaluacionId: Number(this.id)}),
    loader: ({request}) => {
        if (request.evaluacionId <= 0) {
          this.router.navigateByUrl('/evaluations')
          return of()
        } 

        return this.evaluationService.getEvaluationDetails(request.evaluacionId).pipe(          
          catchError( (err: any) => {
            console.error(err);
            this.router.navigateByUrl('/evaluations')
            return of()
          })
        )
    }
  })
  
}