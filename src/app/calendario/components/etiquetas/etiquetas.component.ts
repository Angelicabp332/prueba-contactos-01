import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { EventosService } from '../../services/eventos.service'

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styles:[
    `
    #naval{
      background-color: #2979ff
    }
    #energia{
      background-color: #ff6f00;

    }
    #agro{
      background-color: #c2c2a3
    }
    #ia-ml{
      background-color: #ffea00
    }
    #marketing{
      background-color: #00c853
    }
    #networking{
      background-color: #ff6434
    }
    `
  ]
})
export class EtiquetasComponent  {

  /////////////////
  @Output() viewChange = new EventEmitter<CalendarView>();
  CalendarView = CalendarView;
  @Input() view!: CalendarView;
  @Output() etiquetas: EventEmitter <string> = new EventEmitter();

  respService: any;
  //////////////

  get historial(){
    return this.eventosService.historial;
  }

  colorlist = [
    {nombre: 'Mostrar Todos', secondary: '#E9967A'} ,
    {nombre: 'Naval', secondary:'#4682B4'},
    {nombre: 'Networking', secondary:'#ff7043'},
    {nombre: 'Marketing', secondary:'#3CB371'},
    {nombre: 'Energia', secondary:'#ffad42'},
    {nombre: 'IA-ML', secondary:'#ffff72'},
    {nombre: 'Agro', secondary:'#C0C0C0'},
     ];



   constructor(  private eventosService: EventosService ) { } //

 //selecionar termino desde la barra de busqueda
  buscar(termino : string){

    this.eventosService.buscarEventos(termino)
      return (this.etiquetas.emit(termino));

  }

}

