import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  dataResp: any;
  seleccionPerson: any = [];
  copiaHistorial:any;
  pushHistorial:any=[];
  public _historial: any[] = [];

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

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

  constructor(public modal: NgbModal, private http: HttpClient,
    private _formBuilder: FormBuilder) {
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
            console.log(tabla);
              console.log(indice);
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

  colores = [
    { value: '#ffcbf9' },
    { value: '#fae3ff' },
    { value: '#daffd4' },
    { value: '#fff5ba' },
    { value: '#a69afe' },
    { value: '#afcaff' },
    { value: '#ffabab' },
    { value: '#ffb6af' },
    { value: '#e8ba86' }
  ];

todosLosContactos:any=[];
  Contactos() {

    this.http.get('http://localhost:3000/Contact')
      .subscribe((contact: any) => {

        this.dataResp = contact
        for (let person in contact) {
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

    // console.log( );

    document.getElementById("buttonInicio")!.style.display = "none"
  }

  DatosContactos() {

    // this.data = [];
    this.Nombre = [];
    this.Apellido = [];
    this.tel = [];
    this.correo = [];
    this.pagina = [];
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


                  // if(!this.historial.includes(this.dataResp[person].Personal[a].Credencial)){
                    // console.log("No esta repetido");

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

    // this.selctFiltro=[]
    // let valor = this.txtBuscar.nativeElement.value;
    // console.log(valor);

    this.buscarContactos(this.termino.trim())
    // this.txtBuscar.nativeElement.value = '';

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

  habilitar = true;
  BotonDesabilitado(){

    if(this.NombreCambio.value.NombreCa != '' && this.ApellidoCambio.value.ApellidoCa != ''
        && this.TelefonoCambio.value.TelefonoCa != '' && this.CorreoCambio.value.CorreoCa != ''
        && this.PaginaCambio.value.PaginaCa != ''){
          console.log("evaluando para habilitar el boton");
          this.habilitar = false
    }else{
      this.habilitar = true
      }

  }

  GuardarNewContact(){
    console.log("guardar contato");

    this.todosLosContactos.push([this.NombreCambio.value.NombreCa, this.ApellidoCambio.value.ApellidoCa,
                                this.TelefonoCambio.value.TelefonoCa, this.CorreoCambio.value.CorreoCa,
                                this.PaginaCambio.value.PaginaCa]);

      console.log(this.todosLosContactos);

  }

  ActivarCamara(){

    console.log("Tomar foto");

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      console.log("Let's get this party started")
       navigator.mediaDevices.getUserMedia({video: true} )
    }



  }

  permisosCam(){

    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector('.video-options>select');
    const video:any = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const screenshotImage = document.querySelector('img');
    const buttons:any = [controls!.querySelectorAll('button')];
    const  streamStarted = false;
    const [play, pause, screenshot] = buttons;
  // const [play:any, pause, screenshot]

   const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      },
    }
  };

//   cameraOptions!.onchange = () => {
//     const updatedConstraints = {
//       ...constraints,
//       deviceId: {
//         exact: cameraOptions!.value
//       }
//     };

//     startStream(updatedConstraints);
//   };
// ///////modificada
//   play.onclick = async () => {
//     if (streamStarted) {
//       video!.play();
//       play.classList.add('d-none');
//       pause.classList.remove('d-none');
//       return;
//     }
//     if ('mediaDevices' in navigator && await navigator.mediaDevices.getUserMedia()) {
//       const updatedConstraints = {
//         ...constraints,
//         deviceId: {
//           exact: cameraOptions!.value
//         }
//       };
//       startStream(updatedConstraints);
//     }
//   };
// ///////////
//   const pauseStream = () => {
//     video!.pause();
//     play.classList.remove('d-none');
//     pause.classList.add('d-none');
//   };

//   const doScreenshot = () => {
//     canvas!.width = video!.videoWidth;
//     canvas!.height = video!.videoHeight;
//     canvas!.getContext('2d')!.drawImage(video, 0, 0);
//     screenshotImage!.src = canvas!.toDataURL('image/webp');
//     screenshotImage!.classList.remove('d-none');
//   };

//   pause.onclick = pauseStream;
//   screenshot.onclick = doScreenshot;

//   const startStream = async (constraints: any) => {
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     handleStream(stream);
//   };


//   const handleStream = (stream: any) => {
//     video!.srcObject = stream;
//     play.classList.add('d-none');
//     pause.classList.remove('d-none');
//     screenshot.classList.remove('d-none');

//   };


//   const getCameraSelection = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(device => device.kind === 'videoinput');
//     const options = videoDevices.map(videoDevice => {
//       return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
//     });
//     cameraOptions!.innerHTML = options.join('');
//   };

//   getCameraSelection();


  }




}
