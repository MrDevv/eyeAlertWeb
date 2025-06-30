import { Component, input, output } from '@angular/core';
import { DataPageable } from '../../../../shared/interfaces/DataPageable';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  currentPage = input<number>(1)
  totalPages = input<number>(10)
  dataPagination = input<DataPageable | undefined>(undefined)

  pageChange = output<number>()


  navigateToPage(page: number){
    this.pageChange.emit(page)    
  }


  get pages(): number[]{        
    const totalPages = this.dataPagination()?.totalPages ?? 0
    return Array.from( {length: totalPages},(_, i) => i + 1)
  }
}
