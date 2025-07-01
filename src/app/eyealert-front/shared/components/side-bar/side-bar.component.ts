import { UpperCasePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'side-bar',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  authService = inject(AuthService)
  sideBarService = inject(SideBarService)

  constructor(){        
    effect(() => {
      if(this.sideBarService.isSideBarVisible()){
        document.body.classList.add('no-scroll')
      }else{
        document.body.classList.remove('no-scroll')
      }
    })
  }
}
