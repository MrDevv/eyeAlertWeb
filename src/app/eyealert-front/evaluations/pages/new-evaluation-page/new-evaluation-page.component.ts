import { Component, effect, inject, signal } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AlertsService } from '../../../../shared/services/alerts.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { EvaluationPredictDTO } from '../../interfaces/EvaluationPredictDTO';


@Component({
  selector: 'new-evaluation-page',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './new-evaluation-page.component.html',
  styleUrl: './new-evaluation-page.component.css'
})
export class NewEvaluationPageComponent {
  evaluationService = inject(EvaluationService)
  fb = inject(FormBuilder)
  alertsService = inject(AlertsService)
  dataPrediction = signal<EvaluationPredictDTO | null>(null)
  isLoading = signal<boolean>(false)

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

    this.isLoading.set(true

    )
    try{
      const reps = await firstValueFrom(this.evaluationService.prediction(this.dataPrediction()!))


    }catch(err){
      console.log(err);
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
}
