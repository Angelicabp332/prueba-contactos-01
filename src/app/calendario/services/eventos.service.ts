import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private _historial: string[] = [];
  public resultados: any[] = [];

  view: CalendarView = CalendarView.Month;
  events$!: Observable<any>;

  //busqueda de etiquetas
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
  }

  eventosEtiquetas: any = []
  eventosNoCoincidientes: any = []

  buscarEventos(query: string = ''): Observable<any>{

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 4);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    console.log(this._historial)

    this.http.get('http://localhost:3000/Event')
      .subscribe((resp: any) => {

        this.eventosEtiquetas = [];
        this.eventosNoCoincidientes = [];

        console.log("resp event --> ", resp);


        for (let a in resp) {
          if (query === 'Mostrar Todos') {
            this.eventosEtiquetas = resp;
          }
          if (resp[a].categoria === query) {
            this.eventosEtiquetas.push(resp[a])


          } else {
            this.eventosNoCoincidientes.push(resp[a])
          }
        }

            console.log(this.eventosEtiquetas)
            console.log(this.eventosNoCoincidientes)
          })

          return this.eventosEtiquetas


  }


}


