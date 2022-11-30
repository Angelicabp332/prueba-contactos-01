import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosComponent } from './components/contactos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contactGo',
        component: ContactosComponent
      },
      {
        path: '**',
        redirectTo: 'contactGo'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
