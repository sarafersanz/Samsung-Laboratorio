import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContactoComponent } from './contactos/form-contacto/form-contacto.component';
import { ListaContactosComponent } from './contactos/lista-contactos/lista-contactos.component';

const routes: Routes = [
  //{ path: "", redirectTo: "contactos", pathMatch: 'full'},

  // Contactos
  { path: "nuevo-contacto", component: FormContactoComponent},
  { path: "editar-contacto", component: FormContactoComponent},
  { path: "contactos", component: ListaContactosComponent},

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
