import { SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, input, ResourceRef } from '@angular/core';
import { ResponseHttpDTO } from '../../../../../interfaces/ResponseHttpDTO';
import { CardEvaluationComponent } from "../../../../components/card-evaluation/card-evaluation.component";
import { EvaluationsByUserDTO } from '../../../../interfaces/EvaluationsByUserDTO';

@Component({
  selector: 'main-data',
  imports: [SlicePipe, CardEvaluationComponent, UpperCasePipe],
  templateUrl: './main-data.component.html',  
  styleUrl: './main-data.component.css'
})
export class MainDataComponent {
  lastestEvaluations = input.required<ResourceRef<ResponseHttpDTO<EvaluationsByUserDTO> | undefined>>()  
}
