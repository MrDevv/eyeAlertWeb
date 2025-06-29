import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class ModalService {
    
    private dialog = inject(MatDialog)

    closeModal(): void{
        this.dialog.closeAll()
    }

    openModal<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing = false): void{
        const config = { data, isEditing }

        this.dialog.open(componentRef, {
            data: config,
            disableClose: true
        });
    }    
}