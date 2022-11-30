import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactosComponent } from './components/contactos.component';

import { ContactosRoutingModule } from './contactos-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactosComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule
  ]
})
export class ContactosModule { }
