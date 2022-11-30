import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { UtilsComponent } from './components/utils/utils.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [
    CalendarioComponent,
    EtiquetasComponent,
    BusquedaComponent,
    UtilsComponent
 ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    RouterModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule
  ],
  exports:[UtilsComponent]
})
export class CalendarioModule { }
