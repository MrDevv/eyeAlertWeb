import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { EvaluationService } from '@evaluations/services/evaluation.service';
import { AlertsService } from '@shared/services/alerts.service';
import { EvaluationPredictDTO } from '@evaluations/interfaces/EvaluationPredictDTO';
import { ModalService } from '@shared/services/modal.service';
import { ModalRiskLevelComponent } from '@evaluations/components/modals/modal-risk-level/modal-risk-level.component';
import { DetalleEvaluacion, SaveEvaluation } from '@evaluations/interfaces/SaveEvaluation';
import { AuthService } from '@auth/services/auth.service';
import { EvaluationResultDTO } from '@evaluations/interfaces/EvaluationResultDTO';


@Component({
  selector: 'new-evaluation-page',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './new-evaluation-page.component.html',
  styleUrl: './new-evaluation-page.component.css'
})
export class NewEvaluationPageComponent {
  dataPrediction = signal<EvaluationPredictDTO | null>(null)
  public readonly isLoading = signal<boolean>(false)  

  evaluationService = inject(EvaluationService)
  private readonly authService = inject(AuthService)
  alertsService = inject(AlertsService)
  fb = inject(FormBuilder)
  
  modalService = inject(ModalService)

  questionForm = this.fb.group({})

  constructor() {
    effect(() => {
      const respQuestions: any = this.questionsResource.value();
      if(respQuestions){        
        for(const question of respQuestions.data){
          this.questionForm.addControl(
            question.nombre,
            new FormControl({
              pregunta_texto: question.pregunta,   
              pregunta_id: question.id,              
              respuesta_id: null,
              respuesta_texto: ''
            })
          )
        }
      }
    })
  }

  questionsResource: any = rxResource({
    request: () => ({}),
    loader: () => this.evaluationService.getQuestionsEvaluation()           
  })

  async onSubmit(){
    const { isValid, message } = this.formIsValid()
    if (!isValid) {
      this.alertsService.warning('Campos no válido', message)
      return
    }
    
    const age = this.questionForm.get('edad')?.value['respuesta_texto'];
    const sex = this.questionForm.get('genero')?.value['respuesta_texto'] == 'Masculino' ? 1 : 0;
    const iop = this.questionForm.get('pio')?.value['respuesta_texto'] == 'No' ? 0 : 1;
    const familyHistory = this.questionForm.get('historial familiar')?.value['respuesta_texto'] == 'No' ? 0 : 1;
    const diabetes = this.questionForm.get('diabetes')?.value['respuesta_texto'] == 'No' ? 0 : 1;
    const hypertension = this.questionForm.get('hipertension')?.value['respuesta_texto'] == 'No' ? 0 : 1;
    const cataractStatus = this.questionForm.get('catarata')?.value['respuesta_texto'] == 'No' ? 0 : 1;

    this.dataPrediction.set({
      age: Number(age),
      sex: sex,
      iop: iop,
      familyHistory: familyHistory,
      diabetes: diabetes,
      hypertension: hypertension,
      cataractStatus: cataractStatus
    })

    console.log(this.questionForm.controls);
    const evaluationDetails: DetalleEvaluacion[] = Object.keys(this.questionForm.controls).map((key: string) => {
      let respuesta: number | null = null
      let respuesta_texto: string = ""

      if (this.questionForm.get(key)?.value['respuesta_id']) {
        respuesta = this.questionForm.get(key)?.value['respuesta_id']
      }else{
        respuesta_texto = this.questionForm.get(key)?.value['respuesta_texto']
      }

      return {
        pregunta_id: this.questionForm.get(key)?.value['pregunta_id'],
        respuesta_id: respuesta,
        respuesta_texto: respuesta_texto
      }
    })    

    this.isLoading.set(true)

    try{
      const resp: EvaluationResultDTO = await firstValueFrom(this.evaluationService.prediction(this.dataPrediction()!))

      const evaluationData: SaveEvaluation = {
        tiempo_prediccion: resp.prediction_time_ms,
        tiempo_prediccion_inicio: resp.start_time,
        tiempo_prediccion_fin: resp.end_time,
        resultado: Number(resp.result_evaluation),
        usuario_id: this.authService.user()?.id!,
        detalle_evaluacion: evaluationDetails
      }

      await firstValueFrom(this.evaluationService.saveEvaluation(evaluationData))

      this.modalService.openModal(ModalRiskLevelComponent, resp)

    }catch(err: any){
      this.alertsService.error("Error", err.message)
      console.error(err);
    }      
    this.isLoading.set(false)
  }

  formIsValid(): {isValid: boolean, message: string}{
    for (const keyControl of Object.keys(this.questionForm.value)) {
      const respValue = this.questionForm.get(keyControl)?.value['respuesta_texto']      

      if(respValue.length == 0){        
        return {
          isValid: false,
          message: 'Por favor conteste todas las preguntas para realizar la evaluación.'
        }          
      }

      if(Number(respValue) < 40 || Number(respValue) > 110){
        return {
          isValid: false,
          message: 'La edad debe ser mayor o igual a 40 y menor a 110.'
        }          
      }          
    }
    
    return {
      isValid: true,
      message: ''
    }
  }

  onChangeFieldText(keyControl: string, target: EventTarget | null){
    const control = this.questionForm.get(keyControl)
    const respuestaTexto = (target as HTMLInputElement).value
    if (control) {
      const currentValue = control.value
      const updateValue = {
        ...currentValue,
        respuesta_texto: respuestaTexto
      }
      control.setValue(updateValue)
    }
  }

  onChangeFieldButton(keyControl: string, respuestaTexto: number, respuestaId: string){   
    const control = this.questionForm.get(keyControl)
    if (control) {
      const currentValue = control.value
      const updateValue = {
        ...currentValue,
        respuesta_texto: respuestaTexto,
        respuesta_id: respuestaId
      }
      control.setValue(updateValue)
    }
  }

  showAlert(){
    this.alertsService.warning("Sobre las evaluaciones", "Los resultados que obtienes aquí son una estimación basada en factores de riesgo y en un modelo de inteligencia artificial con una precisión aproximada del 76%. Esto significa que puede haber errores y que no sustituye una consulta médica. Te recomendamos siempre acudir a un especialista en oftalmología para confirmar tu estado de salud visual.")
  }
}
