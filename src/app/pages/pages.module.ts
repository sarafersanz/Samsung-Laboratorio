import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaContactosComponent } from './contactos/lista-contactos/lista-contactos.component';
import { FormContactoComponent } from './contactos/form-contacto/form-contacto.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaContactosComponent,
    FormContactoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
