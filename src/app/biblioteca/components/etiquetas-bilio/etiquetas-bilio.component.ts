import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-etiquetas-bilio',
  templateUrl: './etiquetas-bilio.component.html'
})
export class EtiquetasBilioComponent implements OnInit {

  @Output() documento: EventEmitter<string> = new EventEmitter();
  @Output() filtro: EventEmitter<string> = new EventEmitter();

  activate: any ;
  activatefilter: any;
  cambiante = true
  elemento:any = [];
  compare:any = [];

  agruparPor = [
    { nombre: 'Etiquetas' },
    { nombre: 'Equipos' },
    { nombre: 'Prioridad' }
  ];

  verPor = [
    { nombre: 'Leido' },
    { nombre: 'No Leido' },
    { nombre: 'Todos' }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  //filtra agrupar por:
  buscarDocs(termino: string, i: number) {
      this.activate = i;
    console.log('entro a documentos buscar--->', termino);
    return (this.documento.emit(termino));
  }

  // filtra ver por:
  filtrarDocs(termino: string, i: number) {
    this.activatefilter = i;
    console.log('se va a filtrar el doc por--->', termino);
    return (this.filtro.emit(termino));
  }

  ClickChange() {

    let boton2 = document.getElementById("filtro2");
    this.elemento.push(this.activate)
    this.compare = this.elemento[this.elemento.length-2]

    // si cambia de grupo resetea la parte de ver por
    if(this.compare != this.activate){
      this.activatefilter = false
    }  // elimina el disable cuando se a seleccionado una opcion previa
    if(this.cambiante){
      boton2!.removeAttribute('disabled')
      this.cambiante = !this.cambiante
    }
   }

}
