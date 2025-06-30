import { Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  message = input<string | null>(null)
}
