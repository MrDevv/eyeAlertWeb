import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../../../../shared/services/modal.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-low-risk-modal',
  imports: [UpperCasePipe],
  templateUrl: './modal-risk-level.component.html',
  styleUrl: './modal-risk-level.component.css'
})
export class ModalRiskLevelComponent {

  matDialog = inject(MAT_DIALOG_DATA)

  modalService = inject(ModalService)

  getMessageRisk(): string{
    if (this.matDialog.data.result_evaluation == "0") {
      return "Mantén tu estilo de vida saludable y realiza controles periódicos"
    }
    
    return "Consulta con un especialista para un examen ocular completo"
  }

  constructor(){
    console.log(this.matDialog);
    console.log(this.matDialog.data);    
  }

}
