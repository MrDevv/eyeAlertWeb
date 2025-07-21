import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../shared/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-detail-informative-data',
  imports: [],
  templateUrl: './modal-detail-informative-data.component.html',
  styleUrl: './modal-detail-informative-data.component.css'
})
export class ModalDetailInformativeDataComponent {

  public readonly matDialog = inject(MAT_DIALOG_DATA)

  public readonly modalService = inject(ModalService)

}
