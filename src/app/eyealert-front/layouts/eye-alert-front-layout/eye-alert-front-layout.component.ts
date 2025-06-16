import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-eye-alert-front-layout',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './eye-alert-front-layout.component.html',
  styleUrl: './eye-alert-layout.component.css'
})
export class EyeAlertFrontLayoutComponent {

}
