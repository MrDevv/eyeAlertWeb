import { Component, inject, input } from '@angular/core';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { EvaluationDTO } from '../../../evaluations/interfaces/EvaluationDTO';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'card-evaluation',
  imports: [UpperCasePipe, DatePipe, TitleCasePipe],
  templateUrl: './card-evaluation.component.html',
  styleUrl: './card-evaluation.component.css'
})
export class CardEvaluationComponent {
  evaluation = input.required<EvaluationDTO>()

  router = inject(Router)


  formatDate(){    
    const fecha = this.evaluation().fecha.split(' ')[0].split('/')    
    const date = new Date(Number(fecha[2]), Number(fecha[1]) - 1, Number(fecha[0]))
    return date;
  }

  navigateToDetail(id: number){
    this.router.navigateByUrl(`evaluations/${id}`)
  }
}
