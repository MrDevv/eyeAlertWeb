import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { QuizzService } from '@quizz/services/quizz.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { firstValueFrom } from 'rxjs';

 type StatusGame = 'inicio' | 'pregunta' | 'finalizado'
 type StatusRespuesta = 'pendiente' | 'correcto' | 'incorrecto'

@Component({
  selector: 'quizz-page',
  imports: [LoaderComponent],
  templateUrl: './quizz-page.component.html',
  styleUrl: './quizz-page.component.css'
})
export class QuizzPageComponent {
  public readonly statusGame = signal<StatusGame>('inicio')  

  public readonly listPreguntas = signal<any>([])
  public readonly isLoading = signal(false)
  public readonly indicePregunta = signal(0)
  public readonly explicacion = signal<string | null>(null)
  public readonly esCorrecto = signal<StatusRespuesta>('pendiente')
  public readonly respuestaSeleccionada = signal<null | any>(null)
  public readonly puntos = signal(0)
  public readonly numPregunta = signal(0)

  private readonly quizzService = inject(QuizzService);
  private readonly authService = inject(AuthService)

  public async jugar(){
    this.isLoading.set(true)
    
    const resp: any = await firstValueFrom(this.quizzService.getPreguntas())
    
    this.statusGame.set('pregunta')
    this.listPreguntas.set(resp.data)
    this.puntos.set(0)

    this.isLoading.set(false)   
  }

  public reset(){
    this.isLoading.set(false)
    this.statusGame.set('inicio')
    this.listPreguntas.set([])
    this.indicePregunta.set(0)
    this.explicacion.set(null)
    this.esCorrecto.set('pendiente')
    this.respuestaSeleccionada.set(null)
    this.puntos.set(0)
    this.numPregunta.set(0)
  }

  public jugarNuevamente(){
    this.isLoading.set(false)    
    this.indicePregunta.set(0)
    this.explicacion.set(null)
    this.esCorrecto.set('pendiente')
    this.respuestaSeleccionada.set(null)
    this.numPregunta.set(0)
    this.jugar()    
  }

  public siguientePregunta(){
    this.indicePregunta.update(value => value + 1);
    this.respuestaSeleccionada.set(null)
    this.explicacion.set(null)
    this.esCorrecto.set('pendiente')
  }

  public calificar(respuestaSeleccionada: any){
    if (this.respuestaSeleccionada() != null) return 
    
    this.numPregunta.update(value => value + 1)
    this.respuestaSeleccionada.set(respuestaSeleccionada)    

    if(respuestaSeleccionada.es_correcta){      
      this.puntos.update(value => value + 1)
      this.esCorrecto.set('correcto')
    }else{
      this.esCorrecto.set('incorrecto')
    }

    const explicacionDescripcion = this.getRespuestaCorrecta() 
    console.log(explicacionDescripcion);    
    
    this.explicacion.set(explicacionDescripcion.explicacion)    
  }

  public async finalizarJuego(){    
    if (!this.authService.user()?.id) return
    this.isLoading.set(true)
    await firstValueFrom(this.quizzService.saveQuizz(this.puntos(), this.authService.user()?.id!))
    this.isLoading.set(false)    
  }

  public getRespuestaCorrecta(){
    return this.listPreguntas()[this.indicePregunta()].respuestas.filter((respuesta: any) => respuesta.es_correcta)[0]
  }
}
