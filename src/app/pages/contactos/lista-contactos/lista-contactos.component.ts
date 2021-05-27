//app.component.ts
import { Component, ViewChild } from '@angular/core';
import { Persona } from '../../../../models/persona';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormContactoComponent } from '../form-contacto/form-contacto.component';

const ELEMENT_DATA: Persona[] = [{
  id: 1560123459632,
  nombre: 'Sara',
  apellidos: 'Fernández Sánchez',
  edad: 33,
  dni: '12345678Z',
  cumple: '15/07/1987',
  color: 'Azul',
  sexo: 'Mujer'
}];

@Component({
  selector: 'app-lista-contactos',
  styleUrls: ['lista-contactos.component.scss'],
  templateUrl: 'lista-contactos.component.html'
})

export class ListaContactosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'edad', 'dni', 'cumple', 'color', 'sexo', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    console.log(obj.action);

    this.dialog.open(FormContactoComponent, { disableClose: true, data: obj, width: '550px' })
      .afterClosed().subscribe(result => {
        if (result.event === 'Añadir') {
          this.addRowData(result.data);
        } else if (result.event === 'Editar') {
          this.updateRowData(result.data);
        }else if(result.event == 'Borrar'){
          this.deleteRowData(result.data);
        }
      });
  }

  addRowData(row_obj){

    console.log(row_obj.cumple);

    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      nombre:row_obj.nombre,
      apellidos:row_obj.apellidos,
      edad:row_obj.edad,
      dni:row_obj.dni,
      cumple:row_obj.cumple,
      color:row_obj.color,
      sexo:row_obj.sexo
    });
    this.table.renderRows();

  }
  updateRowData(row_obj){
    console.log(row_obj.cumple);
    this.dataSource = this.dataSource.filter((value,key)=>{

      if(value.id === row_obj.id){
        value.nombre = row_obj.nombre
        value.apellidos = row_obj.apellidos;
        value.edad = row_obj.edad;
        value.dni = row_obj.dni;
        value.cumple = row_obj.cumple;
        value.color = row_obj.color;
        value.sexo = row_obj.sexo;
      }

      return true;
    });

  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
