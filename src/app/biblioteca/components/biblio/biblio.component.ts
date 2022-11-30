import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css'],
})

export class BiblioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  @Output() item: EventEmitter<string> = new EventEmitter();

  etiqueta: string = '';
  query: string = '';
  filtro: string = '';
  filtrado: any = [];
  docsEtiquetas: any = [];
  docsEtiquetas1: any = [];

  constructor( private http: HttpClient,
    private route: Router) { }

  ngOnInit(): void { }

  colores = [
    { color: '#C55300'},
    { color: '#256D85' },
    { color: '#9EB23B' },
    { color: '#B6E388' },
    { color: '#CA955C' },
    { color: '#FECD70' },
    { color: '#CEE5D0' },
    { color: '#4B5D67' }
  ];

  rutaBiblioteca =
    {
      texto: 'Abrir',
      ruta: '/biblioteca/abrirBiblio'
    }

  // busca los coincidientes segun la etiqueta seleccionada
  buscar(e: any) {

    if (e.length !== 0) {
      this.query = e;
      if (e === 'Etiquetas') {
        this.filtrarEtiquetas(e)
      }
      if (e === 'Equipos') {
        this.filtrarEquipos(e)
      }
      if (e === 'Prioridad') {
        this.filtrarPrioridad(e)
      }
    }
  }

  // filtros secundarios segun la etiqueta seleccionada
  filtrarPor(e: any) {
    if (e.length != 0) {
      this.filtro = e
      if (e === 'Leido' || 'No leido' || 'Todos') {
        console.log('filtros secundarios');
        this.filtrosSecundarios(e)
      }
    }
  }

  // cuando selecciona etiquetas trae su informacion
  filtrarEtiquetas(query: string = '') {

    this.docsEtiquetas = []

    query = query.trim().toLocaleLowerCase();
    console.log(query);


    this.http.get('http://localhost:3000/Etiquetas')
      .subscribe((resp: any) => {
        let c = 0;
        // let b = 0;
        // this.docsEtiquetas = []
        for (let docs in resp) {
          if (query === 'etiquetas') {
            this.docsEtiquetas.push([resp[docs].Nombre, this.colores[c], resp[docs].leido]);
            console.log("este es el valor de c--->",c);

            c++;
          }
        }
        this.docsEtiquetas1 = this.docsEtiquetas;
        console.log(this.docsEtiquetas);
      })

  }

  // cuando selecciona equipos trae su informacion
  filtrarEquipos(query: string = '') {

    this.docsEtiquetas = []

    query = query.trim().toLocaleLowerCase();
    console.log(query);


    this.http.get('http://localhost:3000/Equipos')
      .subscribe((resp: any) => {
        let c = 0;
        for (let docs in resp) {
          if (query === 'equipos') {
            this.docsEtiquetas.push([resp[docs].Nombre, this.colores[c]]);
            c++;
          }
        }
        this.docsEtiquetas1 = this.docsEtiquetas;
        console.log(this.docsEtiquetas);
      })

  }

  // cuando selecciona prioridad trae su informacion
  filtrarPrioridad(query: string = '') {

    this.docsEtiquetas = []

    query = query.trim().toLocaleLowerCase();

    this.http.get('http://localhost:3000/Prioridad')
      .subscribe((resp: any) => {
        let c = 0;
        for (let docs in resp) {
          if (query === 'prioridad') {
            this.docsEtiquetas.push([resp[docs].Nombre, this.colores[c]]);
            c++;
          }
        }
        this.docsEtiquetas1 = this.docsEtiquetas;
      })
  }

  //filtra la respuesta anterior (prioridad o etiquetas o equipo)
  filtrosSecundarios(termino: string = '') {

    let docsCambio: any = [];
    this.filtrado = []

    termino = termino.trim().toLocaleLowerCase();

    docsCambio = this.docsEtiquetas
    console.log(docsCambio);

    for (let docs in this.docsEtiquetas) {
      console.log(this.docsEtiquetas[docs][2]);
      if (this.docsEtiquetas[docs][2] === termino) {
        console.log("entro al if de termino");
        this.filtrado.push(docsCambio[docs])
        console.log(this.filtrado);
      }
      if (termino === 'todos') {
        this.filtrado = docsCambio
      }
    }
    this.docsEtiquetas1 = this.filtrado
  }

  //trae el termino seleccionado y lo envia a la otra ruta para saber de cual esta hablando
  cuandohaceClick(termino: string) {
    console.log("Se emite el termino-->", termino)
    this.etiqueta = termino;
    this.route.navigate([this.rutaBiblioteca.ruta, this.query, this.etiqueta]);
  }


}
