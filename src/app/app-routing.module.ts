import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'calendar',
        loadChildren:() => import('./calendario/calendario.module').then(m => m.CalendarioModule)
      },
      {
        path: 'biblioteca',
        loadChildren:() => import('./biblioteca/biblioteca.module').then(m => m.BibliotecaModule)
      },
      {
        path: 'contactos',
        loadChildren:() => import('./contactos/contactos.module').then(m => m.ContactosModule)
      },
      {
        path: '**',
        redirectTo: 'calendar'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
