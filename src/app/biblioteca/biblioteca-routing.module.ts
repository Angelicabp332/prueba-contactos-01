import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiblioComponent } from './components/biblio/biblio.component';
import { AbrirBiblioComponent } from './components/abrir-biblio/abrir-biblio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'biblio',
        component: BiblioComponent
      },
      {
        path: 'abrirBiblio/:query/:etiqueta',
        component: AbrirBiblioComponent
      },
      {
        path: '**',
        redirectTo: 'biblio'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaRoutingModule { }
