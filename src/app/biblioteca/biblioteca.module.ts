import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { BiblioComponent } from './components/biblio/biblio.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { EtiquetasBilioComponent } from './components/etiquetas-bilio/etiquetas-bilio.component';
import { AbrirBiblioComponent } from './components/abrir-biblio/abrir-biblio.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BiblioComponent,
    EtiquetasBilioComponent,
    AbrirBiblioComponent
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatTableModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatSelectModule,
    MatCheckboxModule

  ]
})

export class BibliotecaModule {

}
