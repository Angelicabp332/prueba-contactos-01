import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {WebcamImage} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ContactosComponent implements OnInit {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  contactos: any = [];
  NombreCompleto: any = [];
  Nombre: any = [];
  Apellido: any = [];
  tel: any = [];
  correo: any = [];
  pagina: any = [];
  origen:any = [];
  comentario:any = [];
  dataResp: any;
  seleccionPerson: any = [];
  copiaHistorial:any;
  pushHistorial:any=[];
  public _historial: any[] = [];
  public webcamImage:any = null;
  private trigger: Subject<void> = new Subject<void>();
  public showWebcam = true;
  public allowCameraSwitch = true;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  get historial() {
    return [...this._historial];
  }

  NombreCambio = this._formBuilder.group({
    NombreCa: ['', Validators.required],
  });

  ApellidoCambio = this._formBuilder.group({
    ApellidoCa: ['', Validators.required],
  });

  TelefonoCambio = this._formBuilder.group({
    TelefonoCa: ['', Validators.required],
  });

  CorreoCambio = this._formBuilder.group({
    CorreoCa: ['', Validators.required],
  });

  PaginaCambio = this._formBuilder.group({
    PaginaCa: ['', Validators.required],
  });
  FotoCambio = this._formBuilder.group({
    FotoCa: ['', Validators.required],
  });
  EmpresaCambio = this._formBuilder.group({
    EmpresaCa: ['', Validators.required],
  });
  CargoCambio = this._formBuilder.group({
    CargoCa: ['', Validators.required],
  });
  ComentarioCambio = this._formBuilder.group({
    ComentarioCa: ['', Validators.required],
  });
  OrigenCambio = this._formBuilder.group({
    OrigenCa: ['', Validators.required],
  });

  constructor(public modal: NgbModal, private http: HttpClient,
    private _formBuilder: FormBuilder,
    private sanitnizer:DomSanitizer) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || []
  }


  ngOnInit(): void {
    let variable:any;

    this.Contactos()

    const setObj = new Set()

    console.log(this._historial);

      for(let person in this._historial){
        for(let a in this.historial[person]){

          let tabla:any = {};
           let unicos = this._historial.filter((indice: any) => {
            return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
          });

          this._historial = unicos
          console.log(this._historial);

        this.contactos.push([this._historial[person][a][0],
         this._historial[person][a][1],
         this._historial[person][a][2],
         this._historial[person][a][3] ]);
         this.contactos = this.contactos.splice(0, 5);

        }
       }

  }

  checkSeleccion: any;

  filtrarPor: any = [
    { nombre: 'Empresa' },
    { nombre: 'Cargo' }
  ];

  // colores = [
  //   { value: '#ffcbf9' },
  //   { value: '#fae3ff' },
  //   { value: '#daffd4' },
  //   { value: '#fff5ba' },
  //   { value: '#a69afe' },
  //   { value: '#afcaff' },
  //   { value: '#ffabab' },
  //   { value: '#ffb6af' },
  //   { value: '#e8ba86' }
  // ];

todosLosContactos:any=[];
empresas:any= [];
  Contactos() {

    this.http.get('http://localhost:3000/Contact')
      .subscribe((contact: any) => {

        this.dataResp = contact
        console.log(this.dataResp );

        for (let person in contact) {
          this.empresas.push(contact[person].Empresa);

          for (let a in contact[person].Personal) {

            this.todosLosContactos.push([contact[person].Personal[a].Nombre,
            contact[person].Personal[a].Apellido,
            contact[person].Personal[a].Cargo,
            contact[person].Personal[a].Credencial]);
          }
        }
        console.log(this.todosLosContactos);

      })
  }

  inicio(){

      this.contactos=[]
      // this.selctFiltro = []
      this.Filter =[]
      this.checkSeleccion =[]


    console.log("salio");

    for(let person in this._historial){
      for(let a in this.historial[person]){
      this.contactos.push([this._historial[person][a][0],
       this._historial[person][a][1],
       this._historial[person][a][2],
       this._historial[person][a][3] ]);
       this.contactos = this.contactos.splice(0, 5);
      }
     }
     console.log(this.contactos);

    document.getElementById("buttonInicio")!.style.display = "none"
  }

  DatosContactos() {

    // this.data = [];
    this.Nombre = [];
    this.Apellido = [];
    this.tel = [];
    this.correo = [];
    this.pagina = [];
    this.origen = [];
    this.comentario = [];
    // this.selctFiltro=[]

    for (let person in this.dataResp) {
      for (let a in this.dataResp[person].Personal) {

        if (this.dataResp[person].Personal[a].Credencial == this.seleccionPerson) {

          console.log("LO ENCONTRE");
          console.log(this.Nombre);

          this.Nombre.push(this.dataResp[person].Personal[a].Nombre)
          this.Apellido.push(this.dataResp[person].Personal[a].Apellido)
          this.tel.push(this.dataResp[person].Personal[a].Tel)
          this.correo.push(this.dataResp[person].Personal[a].Correo)
          this.pagina.push(this.dataResp[person].Personal[a].Pagina)
          this.origen.push(this.dataResp[person].Personal[a].Origen)
          this.comentario.push(this.dataResp[person].Personal[a].Comentario)

          console.log(this.contactos);

        }
      }
    }
  }

  onChangeCheckBox(select: any) {
    console.log(select);
    select = select.trim().toLocaleLowerCase();
    this.checkSeleccion = [];
    console.log(this.checkSeleccion);
    this.checkSeleccion.push(select)
    console.log(this.checkSeleccion);

    this.filtar()
  }

  onSelectPerson(a: any) {
    this.seleccionPerson = []
    this.seleccionPerson.push(a)
    console.log(this.seleccionPerson);
  }

  agregaHistorialSeleccionado(){

    // this.contactos = []
    this.pushHistorial =[]
    for (let person in this.dataResp) {
      for (let a in this.dataResp[person].Personal) {

        if (this.dataResp[person].Personal[a].Credencial == this.seleccionPerson) {

          console.log("aqui van los contactos que va al historial--------->",this.contactos);

          console.log(this.dataResp[person].Personal[a].Nombre);


          this.pushHistorial.unshift([this.dataResp[person].Personal[a].Nombre,
            this.dataResp[person].Personal[a].Apellido,
            this.dataResp[person].Personal[a].Cargo,
            this.dataResp[person].Personal[a].Credencial]);

            console.log(this.pushHistorial)

                    this._historial.unshift(this.pushHistorial);

                    let tabla:any = {};
                    let unicos = this.historial.filter((indice) => {

                    return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
                     });

                     console.log(unicos);

                    this._historial = unicos

                    console.log(this.historial, "historial normal");
                    console.log(this._historial, "historial _");

                    this._historial = this._historial.splice(0, 5);
                    localStorage.setItem('historial', JSON.stringify(this._historial));
                  //  }


         console.log(this._historial);

        }
      }
    }

  }

  Filter: any = [];

  filtar() {
    this.Filter = [];
    this.selctFiltro = []
    console.log(this.dataResp);

    if (this.checkSeleccion == 'empresa') {
      this.Filter = [];
      console.log("Es empresa");
      for (let a in this.dataResp) {
        this.Filter.push(this.dataResp[a].Empresa)
        console.log(this.Filter);
      }

    }
    if (this.checkSeleccion == 'cargo') {
      this.Filter = [];
      console.log("Es cargo");
      for (let person in this.dataResp) {
        for (let a in this.dataResp[person].Personal) {
          if (!this.Filter.includes(this.dataResp[person].Personal[a].Cargo)) {
            this.Filter.push(this.dataResp[person].Personal[a].Cargo)
            console.log(this.Filter);
          }
        }
      }
    }
  }

  selctFiltro: any = [];

  onSelectFilter(a: any) {
    this.selctFiltro = [];
    this.selctFiltro.push(a)
    console.log(this.selctFiltro);
    this.datosListos()
  }

  datosListos() {
    this.contactos = []
    for (let person in this.dataResp) {

      for (let a in this.dataResp[person].Personal) {

        if (this.dataResp[person].Personal[a].Cargo == this.selctFiltro || this.dataResp[person].Empresa == this.selctFiltro) {
          console.log("entro correcto");
          console.log(this.contactos);

          this.contactos.push([this.dataResp[person].Personal[a].Nombre,
          this.dataResp[person].Personal[a].Apellido,
          this.dataResp[person].Personal[a].Cargo,
          this.dataResp[person].Personal[a].Credencial]);

          console.log(this.contactos);

        }
      }
    }
  }

  termino:any;
  buscar() {

    this.getSugerencias(  this.termino.trim() )
    .subscribe(coincidencia => this.todosLosContactos.Personal = coincidencia);
    console.log(this.todosLosContactos);
    console.log(this.termino.trim() );

    this.buscarContactos(this.termino.trim())

    if(this.termino == 0 || this.termino == ''){
      this.inicio()
    }

  }

  getSugerencias( termino:string) {
    return this.http.get(`http://localhost:3000/Contact`);
  }

  buscarContactos(query: string = '') {

    if (query != '') {

      this.contactos = []
      this.Filter = []

      query = query.trim().toLowerCase();

      for (let person in this.dataResp) {
        for (let a in this.dataResp[person].Personal) {

          if (this.dataResp[person].Personal[a].Nombre == query || this.dataResp[person].Personal[a].Nombre.includes(query)||
               this.dataResp[person].Personal[a].Apellido == query || this.dataResp[person].Personal[a].Apellido.includes(query)||
              this.dataResp[person].Personal[a].Cargo == query || this.dataResp[person].Personal[a].Cargo.includes(query)||
               this.dataResp[person].Personal[a].Credencial == query || this.dataResp[person].Personal[a].Credencial.includes(query)) {


            this.contactos.push([this.dataResp[person].Personal[a].Nombre,
            this.dataResp[person].Personal[a].Apellido,
            this.dataResp[person].Personal[a].Cargo,
            this.dataResp[person].Personal[a].Credencial]);

              // if (!this._historial.includes(this.contactos[0][3]) ){
              //   this._historial.unshift(this.contactos);
              //   this._historial = this._historial.splice(0, 5);
              //   localStorage.setItem('historial', JSON.stringify(this._historial));
              // // }

            // console.log(this._historial)
          }
        }
      }
    }
  }

  onChangeCambiosNombre(a:any){
    console.log(a);
    console.log(this.Nombre);

    if( this.Nombre !=0 ){

    }

  }
  onChangeCambiosApellido(a:any){
    console.log(a);

  }
  onChangeCambiosTelefono(a:any){
    console.log(a);

  }
  onChangeCambiosCorreo(a:any){
    console.log(a);

  }
  onChangeCambiosPagina(a:any){
    console.log(a);

  }
  onChangeCambiosOrigen(a:any){
    console.log(a);

  }
  onChangeCambiosComentario(a:any){
    console.log(a);

  }


  habilitar = true;

  BotonDesabilitado(){

    if(this.NombreCambio.value.NombreCa != '' && this.ApellidoCambio.value.ApellidoCa != ''
        && this.TelefonoCambio.value.TelefonoCa != '' && this.CorreoCambio.value.CorreoCa != ''
        && this.PaginaCambio.value.PaginaCa != '' && this.FotoCambio.value.FotoCa != ''){
          console.log("evaluando para habilitar el boton");
          this.habilitar = false
    }else{
      this.habilitar = true
      }

  }

  EscogeEmpresa = '';

  onChangeEscogeEmpresa(empresa:any){
    console.log(empresa);
    console.log(this.EscogeEmpresa);

  }
  GuardarNewContact(){

    console.log("guardar contato");

    for(let a in this.dataResp){

      if(this.dataResp[a].Empresa == this.EscogeEmpresa){
        console.log(this.dataResp[a].Personal);

        this.dataResp[a].Personal.push(
          {
            Nombre : this.NombreCambio.value.NombreCa,
            Apellido: this.ApellidoCambio.value.ApellidoCa,
            Tel: this.TelefonoCambio.value.TelefonoCa,
            Correo: this.CorreoCambio.value.CorreoCa,
            Pagina: this.PaginaCambio.value.PaginaCa,
            Cargo: this.CargoCambio.value.CargoCa,
            Origen : this.OrigenCambio.value.OrigenCa,
            Comentario : this.ComentarioCambio.value.ComentarioCa
          });

          console.log(this.dataResp[a].Personal);
      }
    }


  }

 //Funciones de camara
  imagenesCam:any = [];
  triggerSnapshot(): void {
    this.trigger.next();

   }

   handleImage(webcamImage: WebcamImage): void {
    console.info('Saved webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.imagenesCam.push(webcamImage)
     this.procesar()
   }

   public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
   }

   animate(){
    let btn:any  = document.querySelector('.btn.actionBtn.cambiacamara')
    btn.addEventListener('click', () => {
      btn.classList.add('animate__animated', 'animate__flipOutY');
      // setTimeout(() => btn.classList.add('animate__animated animate__flipOutY'), 50)
    // btn.classList.remove(' animate__animated animate__flipOutY ')
    })
   }

   public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
}

  public archivos:any = [];
  public previsualizacion:string | undefined;

  ocultarSnapshot(){
    console.log("Esto es web camm",this.webcamImage);
    console.log("ocultar foto tomada");
    this.webcamImage = null;

  }
   archivoCapturado:any;

capturarFile(event:any){
  console.log(this.archivoCapturado);

 this.archivoCapturado = event.target.files[0]
 this.extraer64(this.archivoCapturado).then((imagen:any) => {
  console.log(this.previsualizacion);

  this.previsualizacion = imagen.base
  console.log(imagen);

 })
  this.archivos.push(this.archivoCapturado)
}

extraer64 = async ($event:any) => new Promise((resolve) =>{
  try{
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitnizer.bypassSecurityTrustUrl(unsafeImg)
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve ({
        base:reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base:null
        });
    };
  } catch (e){
    return null;
  }
  return null;
})

subirArchivo():any{
  try{
    const formularioDatos = new FormData();
    this.archivos.forEach((archivo:any) => {
      formularioDatos.append('files', archivo)
      console.log(archivo);

    });

    // this.http.post(`http://localhost:3000/Contact`, formularioDatos )
    // .subscribe(res => {
    //   console.log("resp servidor", res);
    // })
   }
   catch (e){
    console.log('Error', e);
  }
}

procesar(){
  console.log(this.webcamImage.imageAsDataUrl);
}

LimpiarVarCrear(){
  this.archivoCapturado = undefined
  this.previsualizacion = undefined
  console.log(this.NombreCambio.value);
  console.log(this.FotoCambio.value);
  this.NombreCambio.value.NombreCa = '';
  this.ApellidoCambio.value.ApellidoCa = '';
  this.FotoCambio.value.FotoCa = '';
  this.TelefonoCambio.value.TelefonoCa = '';
  this.CorreoCambio.value.CorreoCa = '';
  this.PaginaCambio.value.PaginaCa = '';
}


}
