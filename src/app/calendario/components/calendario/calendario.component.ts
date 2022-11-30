import { Component, Renderer2, ChangeDetectionStrategy, OnInit, ViewChild, TemplateRef, EventEmitter, Output, ElementRef, ViewEncapsulation, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable, Subject, of } from 'rxjs';
import { Film } from '../../interfaces/Film.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

const colors: any = {
  blue: { //naval
    primary: '#1410F2',
    secondary: '#D1E8FF',
  },
  orange: { //energia
    primary: '#FCA206',
    secondary: '#FFE5BC',
  },
  grey: {   //agro
    primary: '#897F7F',
    secondary: '#BBCBCA',
  },
  yellow: { //IA-ML
    primary: '#F7E90F',
    secondary: '#FDF1BA',
  },
  green: {   //marketing
    primary: '#65CC0F',
    secondary: '#D0FDAC',
  },
  red: { //networking
    primary: '#D82C08',
    secondary: '#FAE3E3',
  },
  sincategoria: {
    primary: '#D487E2',
    secondary: '#F4C5FD'
  },
};

const colors2: any = {
  naval: {
    secondary: '#4682B4'
  },
  Networking: {
    secondary: '#ff7043'
  },
  Marketing: {
    secondary: '#3CB371'
  },
  Energia: {
    secondary: '#ffad42'
  },
  IAML: {
    secondary: '#ffff72'
  },
  Agro: {
    secondary: '#F4C5FD'
  },
  Todos: {
    secondary: '#E9967A'
  }
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './calendario.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendario.component.scss'],
  styles: [
    `
     .cargando{
      margin : 180px;
     }
     .contenedorInicial{
      font-family: 'Open Sans', sans-serif;
      /* font-size: 15px; */
      color: #495161;
     }
     .logoDark{
      display: none;
     }

    .checkbox-wrapper-55 input[type="checkbox"] {
      visibility: hidden;
      display: none;
    }

    .checkbox-wrapper-55 *,
    .checkbox-wrapper-55 ::after,
    .checkbox-wrapper-55 ::before {
      box-sizing: border-box;
    }

    .checkbox-wrapper-55 .rocker {
      display: inline-block;
      position: relative;
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      color: #888;
      width: 7em;
      height: 4em;
      overflow: hidden;
      border-bottom: 0.5em solid #eee;
    }

    .checkbox-wrapper-55 .rocker-small {
      font-size: 0.75em;
    }

    .checkbox-wrapper-55 .rocker::before {
      content: "";
      position: absolute;
      top: 0.5em;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #999;
      border: 0.5em solid #eee;
      border-bottom: 0;
    }

    .checkbox-wrapper-55 .switch-left,
    .checkbox-wrapper-55 .switch-right {
      cursor: pointer;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5em;
      width: 3em;
      transition: 0.2s;
      user-select: none;
    }

    .checkbox-wrapper-55 .switch-left {
      height: 2.4em;
      width: 2.75em;
      left: 0.85em;
      bottom: 0.4em;
      background-color: #ddd;
      transform: rotate(15deg) skewX(15deg);
    }

    .checkbox-wrapper-55 .switch-right {
      right: 0.5em;
      bottom: 0;
      background-color: #bd5757;
      color: #fff;
    }

    .checkbox-wrapper-55 .switch-left::before,
    .checkbox-wrapper-55 .switch-right::before {
      content: "";
      position: absolute;
      width: 0.4em;
      height: 2.45em;
      bottom: -0.45em;
      background-color: #ccc;
      transform: skewY(-65deg);
    }

    .checkbox-wrapper-55 .switch-left::before {
      left: -0.4em;
    }

    .checkbox-wrapper-55 .switch-right::before {
      right: -0.375em;
      background-color: transparent;
      transform: skewY(65deg);
    }

    .checkbox-wrapper-55 input:checked + .switch-left {
      background-color: #0084d0;
      color: #fff;
      bottom: 0px;
      left: 0.5em;
      height: 2.5em;
      width: 3em;
      transform: rotate(0deg) skewX(0deg);
    }

    .checkbox-wrapper-55 input:checked + .switch-left::before {
      background-color: transparent;
      width: 3.0833em;
    }

    .checkbox-wrapper-55 input:checked + .switch-left + .switch-right {
      background-color: #ddd;
      color: #888;
      bottom: 0.4em;
      right: 0.8em;
      height: 2.4em;
      width: 2.75em;
      transform: rotate(-15deg) skewX(-15deg);
    }

    .checkbox-wrapper-55 input:checked + .switch-left + .switch-right::before {
      background-color: #ccc;
    }

    /* Keyboard Users */
    .checkbox-wrapper-55 input:focus + .switch-left {
      color: #333;
    }

    .checkbox-wrapper-55 input:checked:focus + .switch-left {
      color: #fff;
    }

    .checkbox-wrapper-55 input:focus + .switch-left + .switch-right {
      color: #fff;
    }

    .checkbox-wrapper-55 input:checked:focus + .switch-left + .switch-right {
      color: #333;
    }
    .form-switch{
      padding:0;
    }
     `
  ]

})
export class CalendarioComponent implements OnInit, OnDestroy {

  personal = new FormControl('');

  personalList: string[] = [
    'Maria Angelica Becerra - MBX',
    'Pedro Perez - PAP',
    'Javier Camacho - JCC',
    'Tony Jose - TJN',
    'Masha Alexandra - MAP',
    'Alexander Blanco - AMF'];


  /////////////
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  @Output() viewChange = new EventEmitter<CalendarView>();
  /////////////////////////

  CalendarView = CalendarView;
  refresh: Subject<void> = new Subject();
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$!: Observable<any>;
  setColor: any;
  activeDayIsOpen: boolean = false;
  // selectedValue!: string;
  selectDay:any = {};
  opcionSeleccionado: string = '0';
  verSeleccion: any = [];
  DATOSGLOBALES:any = [];

  ///////////////

  public historial: string[] = [];
  private _refresh$ = new Subject<void>();

  modalData: {
    action: string;
    event: any;
  } | undefined;
  // task: any;

  private readonly darkThemeClass = 'dark-theme';

  constructor(private modal: NgbModal,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: any) {

  }
  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

  ngOnInit() {
    this.fetchEvents();
    // this.events$.subscribe((r:any)=>{
    //   console.log("------------",r);

    // })

  }

  handleEvent(action: string, event: CalendarEvent): void {

    this.selectDay = event
    console.log("Es selectDay",this.selectDay);
    // this.TomarAsignaciones()
    this.modalData = { event, action };
    console.log("Es modalData",this.modalData);
    this.modal.open(this.modalContent, { size: 'md' });
    console.log("Es modalContent",this.modalContent);

    this.events$.subscribe((r: any) => {
      console.log("en el subscribe");
      console.log("cambiando el json ", r);
      for (let a in r) {
        console.log("En en for");

        if(this.selectDay.title == r[a].title){
        this.verSeleccion = r[a].asignado
        }
      }
      console.log("SALIENDO DEL FOR DEL MODAL");

    return r
  })

  }

  mostrar: boolean = true;

  fetchEvents() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];


    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'yyyy-MM-dd')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'yyyy-MM-dd')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http.get('http://localhost:3000/Event', { params })
      .pipe(
        map((results: any) => {

          console.log("rsults -> ", results);
          this.DATOSGLOBALES = results
          let r = [];

          for (let a in results) {
            console.log("EN el for principal");

            if (results[a].categoria.includes('naval')) {
              results[a].color.primary = colors.blue.primary;
              results[a].color.secondary = colors.blue.secondary;

            }
            else if (results[a].categoria.includes('energia')) {
              results[a].color.primary = colors.orange.primary;
              results[a].color.secondary = colors.orange.secondary;

            }
            else if (results[a].categoria.includes('agro')) {
              results[a].color.primary = colors.grey.primary;
              results[a].color.secondary = colors.grey.secondary;
            }
            else if (results[a].categoria.includes('ia-ml')) {
              results[a].color.primary = colors.yellow.primary;
              results[a].color.secondary = colors.yellow.secondary;

            }
            else if (results[a].categoria.includes('marketing')) {
              results[a].color.primary = colors.green.primary;
              results[a].color.secondary = colors.green.secondary;

            }
            else if (results[a].categoria.includes('networking')) {
              results[a].color.primary = colors.red.primary;
              results[a].color.secondary = colors.red.secondary;
            }
            else {
              results[a].color.primary = colors.sincategoria.primary;
              results[a].color.secondary = colors.sincategoria.secondary;
            }
            r.push(
              {
                title: results[a].title,
                start: new Date(
                  results[a].start + getTimezoneOffsetString(this.viewDate)
                ),
                end: new Date(
                  results[a].end + getTimezoneOffsetString(this.viewDate)
                ),
                color: results[a].color,
                allDay: false,
                categoria: results[a].categoria,
                asignado : results[a].asignado
              }
            )

            // if(this.selectDay.title ==  results[a].title){
            //   this.verSeleccion =  results[a].asignado
            //   }
          }
          console.log("SALIENDO DE LA FUNCION PRINCIPAL");

          return r;

        })
      );

  }

  eventEtqi = [];

  buscar(e: any) {

    this.fetchEvents();

    if (e.length !== 0) {
      this.fetchEtiq(e)
    }

  }

  fetchEtiq(e: any) {

    let eve: any = [];

    let query = e.trim().toLocaleLowerCase();

    this.events$.subscribe((r: any) => {
      console.log("dentro del subscribe ", r);

      for (let a in r) {

        if (r[a].categoria === query) {
          eve.push(r[a])
        }
        if (query === 'mostrar todos') {

          return r
        }
      }
      this.events$ = of(eve)
    }

    );

  }


  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  remove(persona: any): void {
    const index = this.verSeleccion.indexOf(persona);

    if (index >= 0) {
      this.verSeleccion.splice(index, 1);
    }
  }

  onChangeCapturar(persona: any) {

    this.opcionSeleccionado= "";
    let lista: any[] =[];
    this.verSeleccion.push(persona)
    console.log("ants de entrar al subscribe");


    this.events$.subscribe((r: any) => {
      console.log(" EN EL subscribe");
      for (let a in r) {
        console.log(this.selectDay.title == r[a].title);
        // console.log("---------",r[a].title,"---------");

        if(this.selectDay.title == r[a].title){
          console.log("este es selct day",this.selectDay);
           r[a].asignado = this.verSeleccion

           console.log(this.verSeleccion);

        }
        lista.push(r[a])
        }

        console.log(lista);

        return this.events$ = of(lista)
    })
    //
    console.log(this.verSeleccion);
  }

  modo: boolean = false;

  onChangesModo() {

    console.log(this.modo)

    if (this.modo === true) {
      console.log('modo cambio a true')
      console.log(this.modo)
      this.document.body.classList.add(this.darkThemeClass);
    } else {
      console.log('modo cambio a false')
      console.log(this.modo)
      this.ngOnDestroy()
    }

  }


}
