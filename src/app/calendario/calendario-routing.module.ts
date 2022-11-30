import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'go',
        component: CalendarioComponent
      },
      {
        path: '**',
        redirectTo: 'go'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarioRoutingModule { }
