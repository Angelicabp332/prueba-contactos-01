import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement> ;

  constructor( private eventosService : EventosService){

  }

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0){
      return;
    }
    this.eventosService.buscarEventos( valor)
    this.txtBuscar.nativeElement.value = '';
  }


}
