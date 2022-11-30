import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-abrir-biblio',
  templateUrl: './abrir-biblio.component.html',
  styleUrls: ['./abrir-biblio.component.css'],
})
export class AbrirBiblioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  events$!: Observable<any>;
  terminonuevo: any = '';
  query: any = '';
  data: any = [];
  docsOfItem: any = [];
  dataResp: any;
  tituloDoc = '';
  colorIni: any = '';

  tipos = [
    { nombre: 'leido' },
    { nombre: 'pendiente' },
    { nombre: 'recomendable' },
    { nombre: 'disponible' },
    { nombre: 'mas leido' }
  ];

  filtrarPor = [
    { nombre: 'Fecha', checked: false },
    { nombre: 'Prioridad', checked: false },
    { nombre: 'Tamaño', checked: false },
    { nombre: 'Tema', checked: false },
    { nombre: 'Mas Leidos', checked: false },
    { nombre: 'Nombre', checked: false }
  ];

  personalList: any[] = [
    { nombre: 'Maria Angelica Becerra - MBX', estado: true },
    { nombre: 'Pedro Perez - PAP', estado: true },
    { nombre: 'Javier Camacho - JCC', estado: true },
    { nombre: 'Tony Jose - TJN', estado: true },
    { nombre: 'Masha Alexandra - MAP', estado: true },
    { nombre: 'Alexander Blanco - AMF', estado: true },
    { nombre: 'Recomendado', estado: true }

  ];

  asignaciones: any = [
    { nombre: "aprueba1", leido: false },
    { nombre: "cprueba2", leido: false },
    { nombre: "bprueba3", leido: false }

  ];

  rutaBiblioteca =
    {
      texto: 'Abrir',
      ruta: '/biblioteca/abrirBiblio'
    }

  constructor(private activateRoute: ActivatedRoute,
    private http: HttpClient,
    public modal: NgbModal,
    private route: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.terminonuevo = this.activateRoute.snapshot.paramMap.get('etiqueta');
    this.query = this.activateRoute.snapshot.paramMap.get('query');

    this.http.get(`http://localhost:3000/${this.query}`)
      .subscribe((resp: any) => {
        this.dataResp = resp;
        this.buscarItem(this.terminonuevo)
      })

    this.asignacionCount = this.asignaciones.length;

  }

  buscarItem(doc: any) {

    this.docsOfItem = [];
    doc = doc.trim().toLocaleLowerCase();
    console.log(doc);

    for (let a in this.dataResp) {
      for (let i in this.dataResp[a].contiene) {
        if (this.dataResp[a].contiene[i].categoria === doc) { // "anterior if --->", this.dataResp[a].Nombre === this.terminonuevo && this.dataResp[a].contiene[i].categoria === doc
          this.docsOfItem.push(i);
        }
      }
    }
    console.log("docs", this.docsOfItem)
  }

  // identificar cual de los documentos se esta hablando
  cuandohaceClick(termino: any) {
    console.log("Se emite el termino-->", termino)

    this.tituloDoc = termino
    this.obtenerData()
  }

  // obtiene los datos correspondientes de cada documento
  obtenerData() {

    this.data = [];

    for (let a in this.docsOfItem) {
      for (let contieneName in this.dataResp[a].contiene) {
        if (contieneName === this.tituloDoc || this.dataResp[a].contiene[contieneName].tema === this.tituloDoc) {

          console.log(this.dataResp[a].contiene[contieneName].tema);
          console.log(this.tituloDoc);

          this.data.push(this.dataResp[a].contiene[contieneName]);
          this.categoria = []
          this.prioridad = []
          this.misAsignaciones = []


          this.prioridad.push(this.dataResp[a].contiene[contieneName].prioridad)
          this.categoria.push(this.dataResp[a].contiene[contieneName].categoria)
          this.misAsignaciones.push(this.dataResp[a].contiene[contieneName].asignado)
          this.verSeleccion = this.dataResp[a].contiene[contieneName].asignar

          this.personalList.forEach(p => {
            if(this.verSeleccion.length == 0){
              p.estado = true
            } else{
              for(let item in this.verSeleccion){
                if (p.nombre === this.verSeleccion[item]) {
                  p.estado = !p.estado
                }
              }
            }
          })

          for (let ite in this.asignaciones) {
            if (this.asignaciones[ite].nombre === this.tituloDoc) {
              this.estadoLeido = this.asignaciones[ite].leido
            }

          }

        }
      }
    }
    console.log('esta es la data', this.data);
  }

  opcionSeleccionado: string = '0';
  verSeleccion: any = [];

  onChangeCapturar(e: any) {
    // this.eGlobal = e;

           console.log(this.verSeleccion);

          this.personalList.forEach(p => {
            if (p.nombre === e) {
              p.estado = false
            }
          }
          )

            this.opcionSeleccionado = ""
            this.verSeleccion.push(e)
            console.log(this.verSeleccion)

            this.capAsignar()


  }

  //  recomendado:any  = this.personalList
  compare: any;
  removeRecomendado: any
  activatefilter: any;

  capAsignar() {
    this.compare = this.verSeleccion[this.verSeleccion.length - 1]
    console.log(this.compare);

    console.log('EN ASIGANR');

    for (let a in this.docsOfItem) {

      for (let contieneName in this.dataResp[a].contiene) {

        if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {

          this.dataResp[a].contiene[contieneName].asignar = this.verSeleccion

          if (this.verSeleccion == 'Recomendado' || this.compare == 'Recomendado') {
            console.log('es recomendado');
            this.verSeleccion = []
            for (let element in this.personalList) {

              this.personalList[element].estado = false

              this.verSeleccion.push(this.personalList[element].nombre)

              // No deja que recoemndado se muestre en los seleccionados y no lo deshabilita
              this.removeRecomendado = this.verSeleccion.splice(this.personalList.length - 1, 1)
              console.log(this.removeRecomendado);
              if (this.removeRecomendado == 'Recomendado') {
                this.personalList[element].estado = true
              }
            }
          }
        }
      }
    }
  }

  // remueve la persona en el matchip list del dialog
  remove(persona: any): void {
    const index = this.verSeleccion.indexOf(persona);

    this.personalList.forEach(p => {
      if (p.nombre === persona) {
        p.estado = !p.estado
      }
    })

    if (index >= 0) {
      this.verSeleccion.splice(index, 1);
    }
    this.opcionSeleccionado = ""
  }
  checkSeleccion: any = [];

  // captura la opcion por la que quiere filtrar el usuario
  onChangeCheckBox(seleccion: any) {

    seleccion = seleccion.trim().toLocaleLowerCase();
    this.checkSeleccion = []
    this.checkSeleccion.push(seleccion)
    this.filtarPor()
  }

  datosQueSeFiltran: any = [];
  prom: any;
  sum: any;
  masleido: any = [];
  nuevosDocs: any = [];
  dataOrder: any = [];
  variable: any;

  // filtros de ordenar por
  filtarPor() {

    for (let a in this.dataResp) {
      if (this.dataResp[a].Nombre === this.terminonuevo) {

        this.variable = this.terminonuevo
        this.variable = this.variable.trim().toLocaleLowerCase();

        if (this.checkSeleccion == 'nombre') {

          console.log(this.variable);
          this.datosQueSeFiltran = []
          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {

              this.datosQueSeFiltran.push(i)
              this.datosQueSeFiltran.sort()
            }
          }
          this.docsOfItem = this.datosQueSeFiltran
        }
        if (this.checkSeleccion == 'mas leidos') {

          this.datosQueSeFiltran = []
          this.masleido = []
          let temp: any = []

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {
              this.datosQueSeFiltran.push(this.dataResp[a].contiene[i])
              temp = this.datosQueSeFiltran
              for (let i = 0; i < temp.length; i++) {

                for (let j = 0; j < temp.length - 1; j++) {

                  if (temp[j].tamaño > temp[j + 1].tamaño) {

                    let t = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = t;
                  }
                }
              }
            }
          }

          for (let e in temp) {
            this.masleido.push(temp[e].tema)
          }
          this.docsOfItem = this.masleido
        }
        if (this.checkSeleccion == 'tema') {
          this.docsOfItem = []
          this.nuevosDocs = []
          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {
              this.nuevosDocs.push(this.dataResp[a].contiene[i].tema)
              this.docsOfItem = this.nuevosDocs
            }
          }
        }
        if (this.checkSeleccion == 'tamaño') {

          this.datosQueSeFiltran = []
          this.nuevosDocs = []
          this.dataOrder = []
          this.docsOfItem = []
          let temp2: any = []
          let temp: any = []

          for (let item in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[item].categoria === this.variable) {


              this.dataOrder.push(this.dataResp[a].contiene[item])

              temp = this.dataOrder;

              for (let i = 0; i < temp.length; i++) {

                for (let j = 0; j < temp.length - 1; j++) {

                  if (temp[j].tamaño > temp[j + 1].tamaño) {

                    let t = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = t;

                    console.log(temp);
                    console.log(this.dataResp[a].contiene[item]);

                  }
                }
              }
            }
          }
          for (let e in temp) {
            temp2.push(temp[e].tema)
          }
          console.log(temp2);
          this.docsOfItem = temp2
        }

        if (this.checkSeleccion == 'prioridad') {
          // this.docsOfItem = []
          this.dataOrder = []
          let d = [];
          let b = [];
          let c = [];

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {

              if (this.dataResp[a].contiene[i].prioridad === 'alta') {
                b.push(i)
              }
              if (this.dataResp[a].contiene[i].prioridad === 'media') {
                c.push(i)
              }
              if (this.dataResp[a].contiene[i].prioridad === 'baja') {
                d.push(i)
              }

            }
          }

          this.dataOrder = b.concat(c, d)
          console.log(this.dataOrder);

          this.docsOfItem = this.dataOrder

        }
        if (this.checkSeleccion == 'fecha') {
          this.dataOrder = []
          this.docsOfItem = []
          let compare: any = [];
          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {
              this.dataOrder.push(this.dataResp[a].contiene[i])
            }
          }

          this.dataOrder.sort(function (x: any, y: any) {
            let firstDate = new Date(x.fecha),
              SecondDate = new Date(y.fecha);

            if (firstDate < SecondDate)
              return -1;
            if (firstDate > SecondDate)
              return 1;
            console.log("estamos en el if");

            return 0;
          });
          for (let a in this.dataOrder) {
            compare.push(this.dataOrder[a].tema)
          }
          console.log(this.dataOrder);

          this.docsOfItem = compare

          console.log(compare);

        }
        if (this.checkSeleccion == 'leido') {
          // this.datosQueSeFiltran=[]
          this.docsOfItem = []
          console.log("termino es Leido");
          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].leido != 0 && this.dataResp[a].contiene[i].categoria === this.variable) {

              this.docsOfItem.push(i)
            }
          }
          console.log(this.docsOfItem);
        }

        if (this.checkSeleccion == 'pendiente') {
          this.docsOfItem = []

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].estado === 'pendiente' && this.dataResp[a].contiene[i].categoria === this.variable) {
              this.docsOfItem.push(i)
            }
          }
          console.log(this.docsOfItem);
        }
        if (this.checkSeleccion == 'recomendable') {
          this.docsOfItem = []

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].estado === 'recomendable' && this.dataResp[a].contiene[i].categoria === this.variable) {
              this.docsOfItem.push(i)
            }
          }
          console.log(this.docsOfItem);
        }
        if (this.checkSeleccion == 'disponible') {
          this.docsOfItem = []

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].estado === 'disponible' && this.dataResp[a].contiene[i].categoria === this.variable) {
              this.docsOfItem.push(i)
            }
          }
          console.log(this.docsOfItem);
        }
        if (this.checkSeleccion == 'mas leido') {
          // this.datosQueSeFiltran=[]
          this.docsOfItem = []
          this.datosQueSeFiltran = []
          this.masleido = []

          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].categoria === this.variable) {
              this.datosQueSeFiltran.push(this.dataResp[a].contiene[i].leido)
              console.log(this.datosQueSeFiltran);
            }
          }

          this.sum = this.datosQueSeFiltran.reduce((previous: any, current: any) => current += previous);
          this.prom = this.sum / this.datosQueSeFiltran.length;
          for (let i in this.dataResp[a].contiene) {
            if (this.dataResp[a].contiene[i].leido > this.prom && this.dataResp[a].contiene[i].categoria === this.variable) {

              this.masleido.push(i)

            }
          }
          this.docsOfItem = this.masleido
        }

        // if (this.checkSeleccion == 'disponible' || 'recomendable' || 'pendiente') {
        //   this.docsOfItem = []

        //   for (let i in this.dataResp[a].contiene) {
        //     if (this.dataResp[a].contiene[i].estado == this.checkSeleccion) {
        //       this.docsOfItem.push(i)
        //     }
        //   }
        //   console.log(this.docsOfItem);
        // }

      }
    }
  }

  //cuando editan nombre o tema o prioridad o categoria
  cambiosNombre: any = [];
  onChangeCambiosNombre(e: any) {
    this.cambiosNombre = []

    this.cambiosNombre.push(e)
    if (this.cambiosNombre.length !== 0) {
      console.log(this.cambiosNombre);
      this.editarNombre();
    }
  }

  cambiosTema: any = [];
  onChangeCambiosTema(e: any) {
    this.cambiosTema = []

    this.cambiosTema.push(e)
    if (this.cambiosTema.length !== 0) {
      console.log(this.cambiosTema)
      this.editarTema()
    }
  }

  cambiosPrioridad: any = [];
  onChangeCambiosPrioridad(e: any) {
    this.cambiosPrioridad = []

    this.cambiosPrioridad.push(e)
    if (this.cambiosPrioridad.length !== 0) {
      console.log(this.cambiosPrioridad)
      this.editarPrioridad()
    }
  }

  cambiosCategoria: any = [];

  onChangeCambiosCategoria(e: any) {
    this.cambiosCategoria = []
    this.cambiosCategoria.push(e)
    if (this.cambiosCategoria.length !== 0) {
      console.log(this.cambiosCategoria)
      this.editarCategoria()
    }
  }

  nombre: any = [];
  tema: any = [];
  prioridad: any = [];
  categoria: any = [];
  // asignado: any;

  editarNombre() {

    // this.InfoDocs()
    for (let a in this.docsOfItem) {
      for (let contieneName in this.dataResp[a].contiene) {
        if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {
          this.dataResp[a].Nombre = this.nombre
        }
      }
    }
    this.tituloDoc = this.nombre
    console.log(this.nombre);
  }

  editarTema() {
    // this.InfoDocs()
    for (let a in this.docsOfItem) {
      for (let contieneName in this.dataResp[a].contiene) {
        if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {
          this.dataResp[a].contiene[contieneName].tema = this.tema
        }
      }
    }
  }

  editarPrioridad() {
    // this.InfoDocs()
    for (let a in this.docsOfItem) {
      for (let contieneName in this.dataResp[a].contiene) {
        if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {
          this.dataResp[a].contiene[contieneName].prioridad = this.prioridad
        }
      }
    }
  }

  // editar lña categoria dle documento
  editarCategoria() {
    // this.InfoDocs()
    for (let a in this.docsOfItem) {
      for (let contieneName in this.dataResp[a].contiene) {
        if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {
          this.dataResp[a].contiene[contieneName].categoria = this.categoria
        }
      }
    }
  }

  misAsignaciones: any;
  asignacionCount: any =[];

// aceptar o rechazar el documento
  aceptarorechazarDoc(e: boolean) {
    let elemento: any;
    console.log("entro a la funcion");
    console.log("valor de la e--->", e);
    this.misAsignaciones = []

    for (let ite in this.asignaciones) {
      if (this.asignaciones[ite].nombre === this.tituloDoc) {

        if (e === true) {
          console.log("lo acepto");
          console.log(this.asignaciones[ite].nombre === this.tituloDoc);

          this.asignaciones[ite].leido = true
          this.misAsignaciones = this.asignaciones[ite].leido
        }

        if (e === false) {
          console.log("fue rechazado")
          // for (let ite in this.asignaciones) {
          this.asignaciones[ite].leido = false
          console.log(this.asignaciones[ite]);
          this.misAsignaciones = this.asignaciones[ite].leido
        }

        elemento = document.getElementById("botonAceptaryRechazar");
        console.log(elemento);
        elemento.style.display = "none";


        if (this.asignaciones[ite].leido = true) {
          for (let a in this.docsOfItem) {
            for (let contieneName in this.dataResp[a].contiene) {
              if (contieneName === this.tituloDoc && this.dataResp[a].Nombre === this.terminonuevo) {
                this.dataResp[a].contiene[contieneName].asignado = this.misAsignaciones
                console.log(this.dataResp[a].contiene[contieneName]);
              }
            }
          }
        }
      }
    }
  }

  estadoLeido: any;

  // Marcacion de leido
  onChangeLeido(e: boolean) {
    this.estadoLeido = []
    this.asignacionCount = []
    let notificaciones: any = [];
    for (let ite in this.asignaciones) {

      for (let a in this.docsOfItem) {
        if (this.dataResp[a].Nombre === this.terminonuevo && this.asignaciones[ite].nombre === this.tituloDoc) {
          this.estadoLeido = e
          this.asignaciones[ite].leido = this.estadoLeido
        }
      }

      if (this.asignaciones[ite].leido === false) {
        notificaciones.push(this.asignaciones[ite].nombre)
      }
      this.asignacionCount = notificaciones.length;
    }
  }

  elemento:any =[];
  comparacionIndex:any = [];

  abierto(a:any, i:any){

    console.log(a);

    let visto: any;
    visto = document.getElementById(a);

    console.log(visto);


    console.log(this.asignaciones[i].nombre === a);

    if(this.asignaciones[i]){
      console.log(visto);
      visto.removeAttribute('style')
    }


  }


}


