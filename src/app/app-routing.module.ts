import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { FormContactoComponent } from './pages/contactos/form-contacto/form-contacto.component';
import { ListaContactosComponent } from './pages/contactos/lista-contactos/lista-contactos.component';


const routes: Routes = [
  {
    path: '',
    data: {
      base: true
    },
    component: ContentComponent,
    children: [
      {
        path: '',
        redirectTo: "contactos",
        pathMatch: "full",
      },
      // Contactos
      { path: "nuevo-contacto", component: FormContactoComponent},
      { path: "editar-contacto", component: FormContactoComponent},
      {
        path: "contactos", component: ListaContactosComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
