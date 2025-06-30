import { Component, input } from '@angular/core';
import { InformativeDataDTO } from '../../../informative-data/interfaces/InformativeDataDTO';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'card-informative-data',
  imports: [SlicePipe],
  templateUrl: './card-informative-data.component.html',
  styleUrl: './card-informative-data.component.css'
})
export class CardInformativeDataComponent {
  informativeData = input<InformativeDataDTO | null>(null)
}
