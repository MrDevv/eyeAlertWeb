import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SideBarService {
    
    private statusSidebar = signal<boolean>(false)

    isSideBarVisible: Signal<boolean> = computed(() => this.statusSidebar());    


    public open(){
        this.statusSidebar.set(true)
    }

    public close(){
        this.statusSidebar.set(false)
    }

}