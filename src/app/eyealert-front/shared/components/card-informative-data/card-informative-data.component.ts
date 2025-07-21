import { Component, inject, input } from '@angular/core';
import { InformativeDataDTO } from '../../../informative-data/interfaces/InformativeDataDTO';
import { SlicePipe } from '@angular/common';
import { ModalService } from '../../../../shared/services/modal.service';
import { ModalDetailInformativeDataComponent } from '../modal-detail-informative-data/modal-detail-informative-data.component';

@Component({
  selector: 'card-informative-data',
  imports: [SlicePipe],
  templateUrl: './card-informative-data.component.html',
  styleUrl: './card-informative-data.component.css'
})
export class CardInformativeDataComponent {
  
  modalService = inject(ModalService)

  informativeData = input<InformativeDataDTO | null>(null)

  showModalDetail(informativeData: InformativeDataDTO){
    this.modalService.openModal(ModalDetailInformativeDataComponent, informativeData)
  }
}
