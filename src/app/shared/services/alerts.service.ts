import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  warning(title: string = '', message: string = '') {    
    
    if (message.length == 0) {
      Swal.fire({
        title: title,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0C4D96',
      });

      return;
    }

    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C4D96',
    });
  }

  info(title: string = '', message: string = ''){
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C4D96',
    })
  }

  error(title: string = '', message: string = ''){

    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0C4D96',
    })
  }
}
