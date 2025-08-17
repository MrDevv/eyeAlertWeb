import { Component, inject, signal } from '@angular/core';
import { CardInformativeDataComponent } from "../../../shared/components/card-informative-data/card-informative-data.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { InformativeDataService } from '../../services/informative-data.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ActivatedRoute } from '@angular/router';
import { DataPageable } from '../../../../shared/interfaces/DataPageable';
import { InformativeDataDTO } from '../../interfaces/InformativeDataDTO';
import { LoaderComponent } from "@shared/components/loader/loader.component";

@Component({
  selector: 'informative-data-page',
  imports: [CardInformativeDataComponent, PaginationComponent, LoaderComponent],
  templateUrl: './informative-data-page.component.html',
  styleUrl: './informative-data-page.component.css'
})
export class InformativeDataPageComponent {

  private readonly informativeDataService = inject(InformativeDataService)
  private readonly queryParam = inject(ActivatedRoute).snapshot.queryParamMap.get('page') ?? 1

  public readonly currentPage = signal(Number(this.queryParam))

  get listInformativeData(): InformativeDataDTO[] | undefined {
    return this.informativeDataResource.value()?.data?.content
  }

  get dataPagination(): DataPageable | undefined{    
      return this.informativeDataResource.value()?.data?.pageable
    }

  navigateToPage(page: number){
    this.currentPage.set(page)
  }

  informativeDataResource = rxResource({
    request: () => ({
      page: this.currentPage() - 1
    }),
    loader: ({request}) => {      
      return this.informativeDataService.getInformativeData(request.page)
    }
  })

}
